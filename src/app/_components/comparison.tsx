import { IconLayersIntersect, IconWorld } from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Comparison() {
  return (
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
          <Link href="/compare" className={cn(buttonVariants({ variant: "secondary" }))}>
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
  );
}
