import { cn } from '@/lib/utils'
import {
  IconActivity,
  IconBook,
  IconChartBar,
  IconLayersIntersect,
} from '@tabler/icons-react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <IconActivity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              API Benchmark
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/test"
              className="transition-colors hover:text-primary flex items-center gap-1"
            >
              <IconChartBar className="h-4 w-4" />
              Single Test
            </Link>
            <Link
              href="/compare"
              className="transition-colors hover:text-primary flex items-center gap-1"
            >
              <IconLayersIntersect className="h-4 w-4" />
              Compare
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-primary flex items-center gap-1"
            >
              <IconBook className="h-4 w-4" />
              Docs
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/farhan/api-benchmark"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              GitHub
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Nextjs, Autocannon, and shadcn/ui.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-muted-foreground">
              © 2026 API Benchmark Tool
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
