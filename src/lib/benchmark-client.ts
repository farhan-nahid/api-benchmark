import type { BenchmarkStreamEvent, BenchmarkStreamRequest } from "./benchmark-stream";
import type { TestResult } from "./run-autocannon";

export async function streamBenchmarkRun(
  payload: BenchmarkStreamRequest,
  onEvent: (event: BenchmarkStreamEvent) => void,
): Promise<TestResult[]> {
  const response = await fetch("/api/benchmark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (!response.body) {
    throw new Error("Streaming response is not available");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finalResults: TestResult[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;
      const event = JSON.parse(line) as BenchmarkStreamEvent;
      if (event.type === "error") {
        throw new Error(event.message);
      }
      if (event.type === "done") {
        finalResults = event.results;
      }
      onEvent(event);
    }
  }

  const trailing = buffer.trim();
  if (trailing) {
    const event = JSON.parse(trailing) as BenchmarkStreamEvent;
    if (event.type === "error") {
      throw new Error(event.message);
    }
    if (event.type === "done") {
      finalResults = event.results;
    }
    onEvent(event);
  }

  return finalResults;
}
