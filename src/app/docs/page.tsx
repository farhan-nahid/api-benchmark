import { Card, CardContent } from '@/components/ui/card';
import { IconAlertCircle, IconBolt, IconInfoCircle, IconServer, IconShield } from '@tabler/icons-react';

export default function DocsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground">Everything you need to know about the API Benchmark App.</p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconBolt className="h-6 w-6 text-primary" />
            How it Works
          </h2>
          <Card>
            <CardContent className="pt-6 text-muted-foreground space-y-4">
              <p>
                The API Benchmark App uses <strong>Autocannon</strong>, a high-performance HTTP/1.1 benchmarking tool, to run load tests on your endpoints. 
                When you start a test, the following happens:
              </p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Your browser sends a request to our serverless API.</li>
                <li>The server validates the URL for security (SSRF protection).</li>
                <li>An in-memory instance of Autocannon is spawned with your configuration.</li>
                <li>The test runs for the specified duration with the chosen concurrency.</li>
                <li>Results are aggregated and returned as JSON to your browser for visualization.</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconShield className="h-6 w-6 text-green-500" />
            Security & Safety
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center">
                  <IconShield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">SSRF Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    We block all requests to internal IP ranges (10.x.x.x, 192.168.x.x, etc.) and localhost. 
                    This prevents the tool from being used to scan or attack private networks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <IconServer className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Sequential Execution</h4>
                  <p className="text-sm text-muted-foreground">
                    In Comparison Mode, tests are run one after another. This ensures that the serverless function 
                    doesn't hit resource limits and that metrics remain accurate by avoiding bandwidth contention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconAlertCircle className="h-6 w-6 text-yellow-500" />
            Limitations
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
               <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-lg flex items-start gap-3">
                  <IconInfoCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-yellow-900 dark:text-yellow-100">Serverless Constraints</p>
                    <p className="text-yellow-800/80 dark:text-yellow-200/80 mt-1">
                      Since this app is deployed on Vercel Serverless Functions, there are natural limits to duration and concurrency.
                    </p>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded border bg-muted/20">
                    <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-2">Duration</h5>
                    <p className="text-lg font-bold">Max 300 Seconds</p>
                    <p className="text-xs text-muted-foreground mt-1 text-balance">Longer tests may require higher serverless timeout settings.</p>
                  </div>
                  <div className="p-4 rounded border bg-muted/20">
                    <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-2">Concurrency</h5>
                    <p className="text-lg font-bold">Max 50 Connections</p>
                    <p className="text-xs text-muted-foreground mt-1 text-balance">High concurrency may hit CPU limits on small serverless instances.</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="border rounded-lg overflow-hidden divide-y">
             <div className="p-4 bg-muted/10">
                <h4 className="font-bold mb-2">Is my data stored?</h4>
                <p className="text-sm text-muted-foreground">No. This application is completely stateless. We do not use a database or store any test results. Results only exist in your browser's memory after retrieval.</p>
             </div>
             <div className="p-4 bg-muted/10">
                <h4 className="font-bold mb-2">Why can't I test localhost?</h4>
                <p className="text-sm text-muted-foreground">The test is performed by our server, not your browser. Our server cannot reach "localhost" on your machine. Additionally, blocking localhost is a standard security practice to prevent SSRF.</p>
             </div>
             <div className="p-4 bg-muted/10">
                <h4 className="font-bold mb-2">Can I use this for production stress testing?</h4>
                <p className="text-sm text-muted-foreground">No. This tool is designed for quick benchmarks and comparisons. For large-scale stress testing, you should use dedicated tools like k6, JMeter, or distributed load generators.</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
