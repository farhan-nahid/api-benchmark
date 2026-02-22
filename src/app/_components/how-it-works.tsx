import { IconBolt, IconReportAnalytics, IconSettings } from "@tabler/icons-react";

export function HowItWorks() {
  return (
    <section className="container mx-auto border-y px-4 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
          How it Works
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Get comprehensive performance metrics in three simple steps.
        </p>
      </div>
      <div className="relative grid grid-cols-1 gap-8 text-center md:grid-cols-3">
        {/* Connecting lines for desktop */}
        <div className="absolute top-1/2 right-1/4 left-1/3 -z-10 hidden h-0.5 -translate-y-12 bg-muted/50 md:block" />
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/10">
            <IconSettings className="h-8 w-8" />
          </div>
          <h3 className="mb-2 font-bold text-xl">1. Configure</h3>
          <p className="text-muted-foreground">
            Enter your API URL, choose HTTP method, and set your desired load (connections
            & duration).
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/10">
            <IconBolt className="h-8 w-8" />
          </div>
          <h3 className="mb-2 font-bold text-xl">2. Execute</h3>
          <p className="text-muted-foreground">
            Our backend runs benchmark using{" "}
            <code className="rounded bg-muted px-1">autocannon</code>, simulating
            real-world traffic patterns.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/10">
            <IconReportAnalytics className="h-8 w-8" />
          </div>
          <h3 className="mb-2 font-bold text-xl">3. Analyze</h3>
          <p className="text-muted-foreground">
            Instant visual reports with latency percentiles (P50, P90, P99), throughput
            graphs, and error tracking.
          </p>
        </div>
      </div>
    </section>
  );
}
