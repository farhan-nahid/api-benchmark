import autocannon from "autocannon";
import { validateUrl } from "./validate-url";

export interface TestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  duration?: number;
  connections?: number;
  headers?: Record<string, string>;
  body?: string;
}

export interface TestResult {
  url: string;
  requests: {
    average: number;
    mean: number;
    stddev: number;
    min: number;
    max: number;
    total: number;
    sent: number;
  };
  latency: {
    average: number;
    mean: number;
    stddev: number;
    min: number;
    max: number;
    p50: number;
    p75: number;
    p90: number;
    p99: number;
    totalCount: number;
  };
  throughput: {
    average: number;
    mean: number;
    stddev: number;
    min: number;
    max: number;
    total: number;
  };
  errors: number;
  timeouts: number;
  mismatches: number;
  non2xx: number;
  resets: number;
  duration: number;
  connections: number;
}

export async function runAutocannon(config: TestConfig): Promise<TestResult> {
  const validation = validateUrl(config.url);
  if (!validation.success) {
    throw new Error(validation.error.issues[0].message);
  }

  // Enforce limits for serverless safety
  const duration = Math.min(config.duration || 5, 300);
  const connections = Math.min(config.connections || 10, 100);

  return new Promise((resolve, reject) => {
    const instance = autocannon(
      {
        url: config.url,
        method: config.method || "GET",
        duration,
        connections,
        headers: config.headers,
        body: config.body,
      },
      (err: Error | null, result: any) => {
        if (err) {
          return reject(err);
        }

        const formattedResult: TestResult = {
          url: config.url,
          requests: {
            average: result.requests.average,
            mean: result.requests.mean,
            stddev: result.requests.stddev,
            min: result.requests.min,
            max: result.requests.max,
            total: result.requests.total,
            sent: result.requests.sent,
          },
          latency: {
            average: result.latency.average,
            mean: result.latency.mean,
            stddev: result.latency.stddev,
            min: result.latency.min,
            max: result.latency.max,
            p50: result.latency.p50,
            p75: result.latency.p75,
            p90: result.latency.p90,
            p99: result.latency.p99,
            totalCount: result.latency.totalCount,
          },
          throughput: {
            average: result.throughput.average,
            mean: result.throughput.mean,
            stddev: result.throughput.stddev,
            min: result.throughput.min,
            max: result.throughput.max,
            total: result.throughput.total,
          },
          errors: result.errors,
          timeouts: result.timeouts,
          mismatches: result.mismatches,
          non2xx: result.non2xx,
          resets: result.resets,
          duration: result.duration,
          connections: connections,
        };

        resolve(formattedResult);
      },
    );

    autocannon.track(instance, { renderProgressBar: false });
  });
}
