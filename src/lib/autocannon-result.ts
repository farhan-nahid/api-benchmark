import type { TestResult } from "./run-autocannon";

export function formatAutocannonResult(
  url: string,
  result: any,
  connections: number,
): TestResult {
  return {
    url,
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
    connections,
  };
}
