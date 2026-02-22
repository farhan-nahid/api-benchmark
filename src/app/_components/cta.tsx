import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Cta() {
  return (
    <section className="w-full py-24 text-center">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-6 font-bold text-4xl tracking-tight">
          Ready to test your API?
        </h2>
        <p className="mb-10 text-muted-foreground text-xl">
          No registration required. Just enter a URL and get performance metrics in
          seconds.
        </p>
        <Link
          href="/test"
          className={cn(buttonVariants({ size: "lg" }), "group h-12 px-10 text-base")}
        >
          Launch Benchmarker
          <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
