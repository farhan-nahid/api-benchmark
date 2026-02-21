import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconArrowRight, IconBolt, IconChartBar, IconLayersIntersect, IconShield, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 bg-linear-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-8 bg-background/50 backdrop-blur">
            <IconBolt className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
            <span className="text-muted-foreground mr-1">Now with</span>
            <span>Sequential Multi-API Comparison</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Benchmark Your APIs <br /> with Confidence.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A lightweight, serverless, and stateless tool to measure your API performance. 
            Real-time metrics, visual analytics, and side-by-side comparisons.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/test" className={cn(buttonVariants({ size: 'lg' }), "h-12 px-8 text-base group")}>
                Start Testing
                <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/compare" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), "h-12 px-8 text-base shadow-sm")}>
                Compare APIs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-start p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <IconBolt className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Execution</h3>
            <p className="text-muted-foreground">
              Run load tests immediately from your browser. No setup, no waiting, just fast results.
            </p>
          </div>
          <div className="flex flex-col items-start p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <IconChartBar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visual Analytics</h3>
            <p className="text-muted-foreground">
              Understand your API's behavior with beautiful charts for latency, throughput, and error rates.
            </p>
          </div>
          <div className="flex flex-col items-start p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <IconShield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure & Stateless</h3>
            <p className="text-muted-foreground">
              We don't store your data. Built-in SSRF protection keeps internal networks safe.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Preview */}
      <section className="w-full py-24 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <IconLayersIntersect className="h-4 w-4 mr-2" />
              Comparison Mode
            </div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Compare up to 5 APIs side-by-side.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Wondering which environment is faster? Compare your staging vs production or different microservices with identical configurations.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center">
                  <IconWorld className="h-3 w-3 text-green-600" />
                </div>
                <span>Sequential execution to ensure accuracy</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center">
                  <IconWorld className="h-3 w-3 text-green-600" />
                </div>
                <span>Detailed side-by-side latency breakdowns</span>
              </li>
            </ul>
            <Link 
              href="/compare" 
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              Get Started with Comparison
            </Link>
          </div>
          <div className="lg:w-1/2 w-full rounded-2xl border bg-background shadow-2xl p-4 aspect-video flex items-center justify-center overflow-hidden">
             {/* Abstract UI representation */}
             <div className="w-full h-full flex flex-col gap-4">
                <div className="h-8 w-1/3 bg-muted rounded animate-pulse" />
                <div className="flex-1 grid grid-cols-2 gap-4">
                   <div className="bg-muted/50 rounded flex flex-col items-center justify-center p-4">
                      <div className="text-2xl font-bold text-primary">124ms</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Avg Latency</div>
                   </div>
                   <div className="bg-muted/50 rounded flex flex-col items-center justify-center p-4">
                      <div className="text-2xl font-bold text-blue-500">215ms</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Avg Latency</div>
                   </div>
                </div>
                <div className="h-12 w-full bg-primary/5 rounded border border-dashed border-primary/20" />
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to test your API?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            No registration required. Just enter a URL and get performance metrics in seconds.
          </p>
          <Link href="/test" className={cn(buttonVariants({ size: 'lg' }), "px-10")}>
            Launch Benchmarker
          </Link>
        </div>
      </section>
    </div>
  );
}
