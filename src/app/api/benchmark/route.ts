import { NextResponse } from "next/server";
import { encodeBenchmarkEvent, runBenchmarkStream } from "@/lib/benchmark-stream";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        void (async () => {
          try {
            await runBenchmarkStream(
              payload,
              (event) => controller.enqueue(encoder.encode(encodeBenchmarkEvent(event))),
              request.signal,
            );
            controller.close();
          } catch (error: any) {
            controller.enqueue(
              encoder.encode(
                encodeBenchmarkEvent({
                  type: "error",
                  message: error?.message || "Failed to run benchmark",
                }),
              ),
            );
            controller.close();
          }
        })();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to start benchmark" },
      { status: 500 },
    );
  }
}
