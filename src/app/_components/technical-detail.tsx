import { IconCode } from "@tabler/icons-react";

export function TechnicalDetail() {
  return (
    <section className="w-full bg-linear-to-t from-muted/50 to-background py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border-2 bg-card p-8 shadow-2xl md:p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <IconCode className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="font-bold text-2xl">Under the Hood</h2>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 font-bold text-lg">Performance Engine</h3>
              <p className="text-muted-foreground">
                We use <span className="font-medium text-foreground">Autocannon</span>,
                one of the fastest HTTP/1.1 benchmarking tools written in Node.js. It's
                capable of putting significant load on your API to find its true limits.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-bold">Stateless Privacy</h3>
                <p className="text-muted-foreground text-sm">
                  Your URLs, payloads, and results are processed in-memory and never
                  stored in a database. Data is discarded immediately after your session
                  ends.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-bold">Next.js Architecture</h3>
                <p className="text-muted-foreground text-sm">
                  Built with Next.js Server Actions, ensuring low-latency communication
                  between the UI and the benchmarking runner.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 border-t pt-6">
              <span className="rounded-full bg-muted px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                HTTP/1.1 Support
              </span>
              <span className="rounded-full bg-muted px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                Custom Headers
              </span>
              <span className="rounded-full bg-muted px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                SSRF Protection
              </span>
              <span className="rounded-full bg-muted px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                CSV Export
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
