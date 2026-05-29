import autocannon from "autocannon";
import { formatAutocannonResult } from "./autocannon-result";
import type { TestConfig, TestResult } from "./run-autocannon";
import { validateUrl } from "./validate-url";

export type BenchmarkMode = "test" | "compare";

export interface BenchmarkStreamRequest {
  mode: BenchmarkMode;
  urls: string[];
  config: Omit<TestConfig, "url">;
}

export type BenchmarkStreamEvent =
  | {
      type: "run-start";
      mode: BenchmarkMode;
      totalRuns: number;
    }
  | {
      type: "target-start";
      index: number;
      totalRuns: number;
      url: string;
      duration: number;
      connections: number;
    }
  | {
      type: "progress";
      index: number;
      totalRuns: number;
      url: string;
      elapsedSeconds: number;
      remainingSeconds: number;
      completedRequests: number;
      requestsPerSecond: number;
      averageLatencyMs: number;
      lastLatencyMs: number;
      errors: number;
    }
  | {
      type: "target-done";
      index: number;
      totalRuns: number;
      url: string;
      result: TestResult;
    }
  | {
      type: "done";
      results: TestResult[];
    }
  | {
      type: "error";
      message: string;
    };

export function encodeBenchmarkEvent(event: BenchmarkStreamEvent): string {
  return `${JSON.stringify(event)}\n`;
}

export async function runBenchmarkStream(
  request: BenchmarkStreamRequest,
  emit: (event: BenchmarkStreamEvent) => void,
  signal?: AbortSignal,
): Promise<TestResult[]> {
  const urls = request.urls.filter((url) => url.trim().length > 0);
  if (urls.length === 0) {
    throw new Error("At least one URL is required");
  }

  emit({
    type: "run-start",
    mode: request.mode,
    totalRuns: urls.length,
  });

  const results: TestResult[] = [];

  for (const [index, url] of urls.entries()) {
    if (signal?.aborted) {
      throw new Error("Benchmark cancelled");
    }

    const validation = validateUrl(url);
    if (!validation.success) {
      throw new Error(validation.error.issues[0].message);
    }

    const duration = Math.min(request.config.duration || 5, 290);
    const connections = Math.min(request.config.connections || 10, 100);

    emit({
      type: "target-start",
      index: index + 1,
      totalRuns: urls.length,
      url,
      duration,
      connections,
    });

    const result = await runSingleBenchmark(
      url,
      index + 1,
      urls.length,
      { ...request.config, duration, connections },
      emit,
      signal,
    );

    results.push(result);

    emit({
      type: "target-done",
      index: index + 1,
      totalRuns: urls.length,
      url,
      result,
    });
  }

  emit({
    type: "done",
    results,
  });

  return results;
}

async function runSingleBenchmark(
  url: string,
  index: number,
  totalRuns: number,
  config: Omit<TestConfig, "url"> & { duration: number; connections: number },
  emit: (event: BenchmarkStreamEvent) => void,
  signal?: AbortSignal,
): Promise<TestResult> {
  return new Promise((resolve, reject) => {
    let responseCount = 0;
    let errors = 0;
    let responseTimeSum = 0;
    let lastResponseTime = 0;
    let previousResponseCount = 0;
    let elapsedSeconds = 0;

    const instance = autocannon(
      {
        url,
        method: config.method || "GET",
        duration: config.duration,
        connections: config.connections,
        headers: config.headers,
        body: config.body,
      },
      (err: Error | null, result: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(formatAutocannonResult(url, result, config.connections));
      },
    );

    const stopOnAbort = () => {
      instance.stop();
      reject(new Error("Benchmark cancelled"));
    };

    if (signal) {
      if (signal.aborted) {
        stopOnAbort();
        return;
      }

      signal.addEventListener("abort", stopOnAbort, { once: true });
    }

    instance.on("response", (_client, _statusCode, _resBytes, responseTime) => {
      responseCount += 1;
      responseTimeSum += responseTime;
      lastResponseTime = responseTime;
    });

    instance.on("reqError", () => {
      errors += 1;
    });

    instance.on("tick", () => {
      elapsedSeconds += 1;
      const completedThisSecond = responseCount - previousResponseCount;
      previousResponseCount = responseCount;

      emit({
        type: "progress",
        index,
        totalRuns,
        url,
        elapsedSeconds,
        remainingSeconds: Math.max(config.duration - elapsedSeconds, 0),
        completedRequests: responseCount,
        requestsPerSecond: completedThisSecond,
        averageLatencyMs: responseCount > 0 ? responseTimeSum / responseCount : 0,
        lastLatencyMs: lastResponseTime,
        errors,
      });
    });

    instance.on("done", () => {
      if (signal) {
        signal.removeEventListener("abort", stopOnAbort);
      }
    });

    instance.on("error", (error) => {
      if (signal) {
        signal.removeEventListener("abort", stopOnAbort);
      }

      reject(error);
    });
  });
}
