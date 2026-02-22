import { IconArrowRight, IconBolt } from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="w-full bg-linear-to-b from-background to-muted/20 py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8 inline-flex items-center rounded-full border bg-background/50 px-3 py-1 font-medium text-sm backdrop-blur">
          <IconBolt className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="mr-1 text-muted-foreground">Now with</span>
          <span>Private Endpoint Support</span>
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
  );
}
