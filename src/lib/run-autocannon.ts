import autocannon from "autocannon";
import { formatAutocannonResult } from "./autocannon-result";
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
  const duration = Math.min(config.duration || 5, 290);
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

        resolve(formatAutocannonResult(config.url, result, connections));
      },
    );

    autocannon.track(instance, { renderProgressBar: false });
  });
}
