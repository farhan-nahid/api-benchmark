import { IconBolt, IconChartBar, IconShield } from "@tabler/icons-react";

export function Features() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="flex flex-col items-start rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <IconBolt className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-3 font-bold text-xl">Instant Execution</h3>
          <p className="text-muted-foreground">
            Run load tests immediately from your browser. No setup, no waiting, just fast
            results.
          </p>
        </div>
        <div className="flex flex-col items-start rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <IconChartBar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-3 font-bold text-xl">Visual Analytics</h3>
          <p className="text-muted-foreground">
            Understand your API's behavior with beautiful charts for latency, throughput,
            and error rates.
          </p>
        </div>
        <div className="flex flex-col items-start rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <IconShield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-3 font-bold text-xl">Secure & Stateless</h3>
          <p className="text-muted-foreground">
            We don't store your data. Built-in SSRF protection keeps internal networks
            safe.
          </p>
        </div>
      </div>
    </section>
  );
}
