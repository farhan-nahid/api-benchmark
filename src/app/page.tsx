import {
  IconArrowRight,
  IconBolt,
  IconChartBar,
  IconLayersIntersect,
  IconShield,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-linear-to-b from-background to-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 inline-flex items-center rounded-full border bg-background/50 px-3 py-1 font-medium text-sm backdrop-blur">
            <IconBolt className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="mr-1 text-muted-foreground">Now with</span>
            <span>Sequential Multi-API Comparison</span>
          </div>
          <h1 className="mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text font-extrabold text-5xl text-transparent tracking-tight lg:text-7xl">
            Benchmark Your APIs <br /> with Confidence.
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-muted-foreground text-xl">
            A lightweight, serverless, and stateless tool to measure your API performance.
            Real-time metrics, visual analytics, and side-by-side comparisons.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/test"
              className={cn(buttonVariants({ size: "lg" }), "group h-12 px-8 text-base")}
            >
              Start Testing
              <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/compare"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-8 text-base shadow-sm",
              )}
            >
              Compare APIs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-start rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <IconBolt className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 font-bold text-xl">Instant Execution</h3>
            <p className="text-muted-foreground">
              Run load tests immediately from your browser. No setup, no waiting, just
              fast results.
            </p>
          </div>
          <div className="flex flex-col items-start rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <IconChartBar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 font-bold text-xl">Visual Analytics</h3>
            <p className="text-muted-foreground">
              Understand your API's behavior with beautiful charts for latency,
              throughput, and error rates.
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

      {/* Comparison Preview */}
      <section className="w-full bg-muted/30 py-24">
        <div className="container mx-auto flex flex-col items-center gap-16 px-4 lg:flex-row">
          <div className="lg:w-1/2">
            <div className="mb-6 inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
              <IconLayersIntersect className="mr-2 h-4 w-4" />
              Comparison Mode
            </div>
            <h2 className="mb-6 font-bold text-4xl tracking-tight">
              Compare up to 5 APIs side-by-side.
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Wondering which environment is faster? Compare your staging vs production or
              different microservices with identical configurations.
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                  <IconWorld className="h-3 w-3 text-green-600" />
                </div>
                <span>Sequential execution to ensure accuracy</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                  <IconWorld className="h-3 w-3 text-green-600" />
                </div>
                <span>Detailed side-by-side latency breakdowns</span>
              </li>
            </ul>
            <Link
              href="/compare"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Get Started with Comparison
            </Link>
          </div>
          <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border bg-background p-4 shadow-2xl lg:w-1/2">
            {/* Abstract UI representation */}
            <div className="flex h-full w-full flex-col gap-4">
              <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
              <div className="grid flex-1 grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded bg-muted/50 p-4">
                  <div className="font-bold text-2xl text-primary">124ms</div>
                  <div className="mt-1 text-muted-foreground text-xs uppercase tracking-widest">
                    Avg Latency
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded bg-muted/50 p-4">
                  <div className="font-bold text-2xl text-blue-500">215ms</div>
                  <div className="mt-1 text-muted-foreground text-xs uppercase tracking-widest">
                    Avg Latency
                  </div>
                </div>
              </div>
              <div className="h-12 w-full rounded border border-primary/20 border-dashed bg-primary/5" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 text-center">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-6 font-bold text-4xl">Ready to test your API?</h2>
          <p className="mb-10 text-muted-foreground text-xl">
            No registration required. Just enter a URL and get performance metrics in
            seconds.
          </p>
          <Link href="/test" className={cn(buttonVariants({ size: "lg" }), "px-10")}>
            Launch Benchmarker
          </Link>
        </div>
      </section>
    </div>
  );
}
