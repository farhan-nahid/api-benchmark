"use client";

import {
  IconActivity,
  IconBook,
  IconChartBar,
  IconLayersIntersect,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Desktop GitHub Button */}
          <div className="hidden items-center space-x-2 md:flex">
            <a
              href="https://github.com/farhan-nahid/api-benchmark"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 transition-colors hover:bg-accent md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu2 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t bg-background md:hidden">
            <nav className="container mx-auto flex flex-col space-y-1 px-4 py-4">
              <Link
                href="/test"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-accent"
              >
                <IconChartBar className="h-4 w-4" />
                Single Test
              </Link>
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-accent"
              >
                <IconLayersIntersect className="h-4 w-4" />
                Compare
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-accent"
              >
                <IconBook className="h-4 w-4" />
                Docs
              </Link>
              <a
                href="https://github.com/farhan-nahid/api-benchmark"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 font-medium text-sm transition-colors hover:bg-accent"
              >
                GitHub
              </a>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
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
