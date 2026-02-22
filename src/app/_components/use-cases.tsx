import { IconCode, IconDeviceLaptop, IconLock, IconServer } from "@tabler/icons-react";

export function UseCases() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl">Who is this for?</h2>
          <p className="text-lg text-muted-foreground">
            Designed for developers who care about performance.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex gap-4 rounded-2xl bg-muted/20 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <IconCode className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="mb-1 font-bold">Backend Developers</h4>
              <p className="text-muted-foreground text-sm">
                Quickly verify performance optimizations during development without
                setting up complex tools.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl bg-muted/20 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <IconServer className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="mb-1 font-bold">DevOps Engineers</h4>
              <p className="text-muted-foreground text-sm">
                Benchmark different server regions or cloud providers to find the most
                efficient routing.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl bg-muted/20 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <IconLock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="mb-1 font-bold">Security Teams</h4>
              <p className="text-muted-foreground text-sm">
                Measure the latency impact of authentication layers or firewall rules on
                protected endpoints.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl bg-muted/20 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <IconDeviceLaptop className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="mb-1 font-bold">QA / Performance Testers</h4>
              <p className="text-muted-foreground text-sm">
                Perform smoke tests on new releases to catch sudden performance
                regressions early.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
