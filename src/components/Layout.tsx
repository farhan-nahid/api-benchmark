import {
  IconActivity,
  IconBook,
  IconChartBar,
  IconLayersIntersect,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <IconActivity className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">API Benchmark</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 font-medium text-sm md:flex">
            <Link
              href="/test"
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              <IconChartBar className="h-4 w-4" />
              Single Test
            </Link>
            <Link
              href="/compare"
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              <IconLayersIntersect className="h-4 w-4" />
              Compare
            </Link>
            <Link
              href="/docs"
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              <IconBook className="h-4 w-4" />
              Docs
            </Link>
          </nav>

          {/* Desktop GitHub Button & Theme Toggle */}
          <div className="hidden items-center space-x-2 md:flex">
            <ThemeToggle />
            <a
              href="https://github.com/farhan-nahid/api-benchmark"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              GitHub
            </a>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <a
              href="https://github.com/farhan-nahid/api-benchmark"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              GitHub
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileBottomNav />
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row">
          <p className="text-center text-muted-foreground text-sm leading-loose md:text-left">
            Built with Nextjs, Autocannon, and shadcn/ui.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground text-xs">
              © 2026 API Benchmark Tool
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
