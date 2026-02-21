"use server";

import type { TestConfig, TestResult } from "./run-autocannon";
import { runAutocannon } from "./run-autocannon";

export async function runTestAction(config: TestConfig): Promise<TestResult> {
  try {
    return await runAutocannon(config);
  } catch (error: any) {
    throw new Error(error.message || "Failed to run test");
  }
}

export async function compareTestsAction(
  urls: string[],
  config: Omit<TestConfig, "url">,
): Promise<{ apis: TestResult[] }> {
  try {
    const results: TestResult[] = [];
    for (const url of urls) {
      const result = await runAutocannon({ ...config, url });
      results.push(result);
    }
    return { apis: results };
  } catch (error: any) {
    throw new Error(error.message || "Failed to run comparison");
  }
}
