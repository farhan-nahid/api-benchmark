"use client";

import {
  IconBook,
  IconChartBar,
  IconHome,
  IconLayersIntersect,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/", icon: IconHome, label: "Home" },
    { href: "/test", icon: IconChartBar, label: "Test" },
    { href: "/compare", icon: IconLayersIntersect, label: "Compare" },
    { href: "/docs", icon: IconBook, label: "Docs" },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium text-xs">{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Toggle theme"
        >
          {mounted &&
            (theme === "dark" ? (
              <IconSun className="h-5 w-5" />
            ) : (
              <IconMoon className="h-5 w-5" />
            ))}
          <span className="font-medium text-xs">Theme</span>
        </button>
      </div>
    </nav>
  );
}
