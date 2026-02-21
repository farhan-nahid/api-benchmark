import type { TestConfig } from '@/lib/run-autocannon';
import { runAutocannon } from '@/lib/run-autocannon';

export async function POST(request: Request) {
  try {
    const config = (await request.json()) as TestConfig;
    const result = await runAutocannon(config);
    return Response.json(result);
  } catch (error: any) {
    return Response.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
