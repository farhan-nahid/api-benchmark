import type { TestConfig, TestResult } from '@/lib/run-autocannon';
import { runAutocannon } from '@/lib/run-autocannon';

export async function POST(request: Request) {
  try {
    const { urls, ...config } = (await request.json()) as { urls: string[] } & Omit<
      TestConfig,
      'url'
    >;

    const results: TestResult[] = [];
    for (const url of urls) {
      const result = await runAutocannon({ ...config, url });
      results.push(result);
    }

    return Response.json({ apis: results });
  } catch (error: any) {
    return Response.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
