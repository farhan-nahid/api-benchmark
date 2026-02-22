import {
  IconAlertCircle,
  IconBolt,
  IconFileExport,
  IconInfoCircle,
  IconKey,
  IconLock,
  IconServer,
  IconShield,
  IconWorld,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Documentation",
  description: "Everything you need to know about the API Benchmark App.",
};

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-extrabold text-4xl tracking-tight">Documentation</h1>
        <p className="text-muted-foreground text-xl">
          Everything you need to know about the API Benchmark App.
        </p>
      </div>

      <div className="grid gap-12">
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-2xl">
            <IconBolt className="h-6 w-6 text-primary" />
            How it Works
          </h2>
          <Card>
            <CardContent className="space-y-4 pt-6 text-muted-foreground">
              <p>
                The API Benchmark App uses <strong>Autocannon</strong>, a high-performance
                HTTP/1.1 benchmarking tool, to run load tests on your endpoints. When you
                start a test, the following happens:
              </p>
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  Your browser triggers a <strong>Next.js Server Action</strong> with your
                  configuration.
                </li>
                <li>The server validates the URL for security (SSRF protection).</li>
                <li>
                  An in-memory instance of Autocannon is spawned within the serverless
                  environment.
                </li>
                <li>
                  The test runs for the specified duration with the chosen concurrency.
                </li>
                <li>
                  Results are aggregated and returned as JSON to your browser for instant
                  visualization.
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-2xl">
            <IconKey className="h-6 w-6 text-orange-500" />
            Authentication & Custom Headers
          </h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <p className="text-muted-foreground">
                Testing protected endpoints is easy with custom header support. This
                allows you to include API keys, session tokens, or other credentials in
                your requests.
              </p>
              <div className="flex gap-4 rounded-lg border bg-muted/30 p-4">
                <IconInfoCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="text-sm">
                  <p className="mb-1 font-bold">Testing Bearer Tokens</p>
                  <p className="text-muted-foreground">
                    To test an endpoint requiring a JWT, set the header name to{" "}
                    <code className="rounded bg-muted px-1">Authorization</code> and the
                    value to{" "}
                    <code className="rounded bg-muted px-1">
                      Bearer [your_token_here]
                    </code>
                    .
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 font-bold">
                    <IconLock className="h-4 w-4 text-primary" />
                    Private Endpoints
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Benchmark internal or protected services by providing necessary
                    environment-specific headers.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 font-bold">
                    <IconWorld className="h-4 w-4 text-primary" />
                    Custom Agents
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Set custom User-Agent or other metadata headers to bypass simple bot
                    detection or for tracking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-2xl">
            <IconFileExport className="h-6 w-6 text-blue-500" />
            Data Export
          </h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <p className="text-muted-foreground">
                Need the raw data for your own reports? You can export any benchmark
                result to CSV format.
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground text-sm">
                <li>
                  <strong>Individual Tests:</strong> Click "Export CSV" on the results
                  page to get latency percentiles and throughput metrics.
                </li>
                <li>
                  <strong>Comparison Data:</strong> Exporting from Comparison Mode
                  generates a consolidated file with side-by-side metrics for all tested
                  endpoints.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-2xl">
            <IconShield className="h-6 w-6 text-green-500" />
            Security & Safety
          </h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <IconShield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold">SSRF Protection</h4>
                  <p className="text-muted-foreground text-sm">
                    We block all requests to internal IP ranges (10.x.x.x, 192.168.x.x,
                    etc.) and localhost. This prevents the tool from being used to scan or
                    attack private networks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <IconServer className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold">Sequential Execution</h4>
                  <p className="text-muted-foreground text-sm">
                    In Comparison Mode, tests are run one after another. This ensures that
                    the serverless function doesn't hit resource limits and that metrics
                    remain accurate by avoiding bandwidth contention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-2xl">
            <IconAlertCircle className="h-6 w-6 text-yellow-500" />
            Limitations
          </h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                <IconInfoCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                <div className="text-sm">
                  <p className="font-bold text-yellow-900 dark:text-yellow-100">
                    Serverless Constraints
                  </p>
                  <p className="mt-1 text-yellow-800/80 dark:text-yellow-200/80">
                    Since this app is deployed on Vercel Serverless Functions, there are
                    natural limits to duration and concurrency.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border bg-muted/20 p-4">
                  <h5 className="mb-2 font-bold text-muted-foreground text-xs uppercase tracking-widest">
                    Duration
                  </h5>
                  <p className="font-bold text-lg">Max 290 Seconds</p>
                  <p className="mt-1 text-balance text-muted-foreground text-xs">
                    Longer tests may require higher serverless timeout settings.
                  </p>
                </div>
                <div className="rounded border bg-muted/20 p-4">
                  <h5 className="mb-2 font-bold text-muted-foreground text-xs uppercase tracking-widest">
                    Concurrency
                  </h5>
                  <p className="font-bold text-lg">Max 100 Connections</p>
                  <p className="mt-1 text-balance text-muted-foreground text-xs">
                    High concurrency may hit CPU limits on small serverless instances.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-2xl">Frequently Asked Questions</h2>
          <div className="divide-y overflow-hidden rounded-lg border">
            <div className="bg-muted/10 p-4">
              <h4 className="mb-2 font-bold">Is my data stored?</h4>
              <p className="text-muted-foreground text-sm">
                No. This application is completely stateless. We do not use a database or
                store any test results. Results only exist in your browser's memory after
                retrieval.
              </p>
            </div>
            <div className="bg-muted/10 p-4">
              <h4 className="mb-2 font-bold">Why can't I test localhost?</h4>
              <p className="text-muted-foreground text-sm">
                The test is performed by our server, not your browser. Our server cannot
                reach "localhost" on your machine. Additionally, blocking localhost is a
                standard security practice to prevent SSRF.
              </p>
            </div>
            <div className="bg-muted/10 p-4">
              <h4 className="mb-2 font-bold">
                Can I use this for production stress testing?
              </h4>
              <p className="text-muted-foreground text-sm">
                No. This tool is designed for quick benchmarks and comparisons. For
                large-scale stress testing, you should use dedicated tools like k6,
                JMeter, or distributed load generators.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
