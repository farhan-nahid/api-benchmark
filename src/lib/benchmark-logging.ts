import type { BenchmarkStreamEvent } from "./benchmark-stream";

function formatMs(value: number): string {
  return `${value.toFixed(1)}ms`;
}

export function formatBenchmarkEventLine(event: BenchmarkStreamEvent): string | null {
  switch (event.type) {
    case "run-start":
      return `> Benchmark started (${event.totalRuns} target${event.totalRuns === 1 ? "" : "s"})`;
    case "target-start":
      return `> [${event.index}/${event.totalRuns}] ${event.url}`;
    case "progress":
      return `  ${event.elapsedSeconds}s | ${event.completedRequests} req completed | ${event.requestsPerSecond} req/s | avg ${formatMs(event.averageLatencyMs)} | last ${formatMs(event.lastLatencyMs)} | errors ${event.errors}`;
    case "target-done":
      return `✓ [${event.index}/${event.totalRuns}] ${event.url} -> ${event.result.requests.total} requests, avg ${formatMs(event.result.latency.average)}, p90 ${event.result.latency.p90}ms`;
    case "done":
      return `> Benchmark complete (${event.results.length} result${event.results.length === 1 ? "" : "s"})`;
    case "error":
      return `! ${event.message}`;
    default:
      return null;
  }
}
