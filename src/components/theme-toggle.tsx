"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-8 w-14 rounded-full bg-secondary animate-pulse" />
    );
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-14 items-center rounded-full border border-border/60 bg-secondary p-1 transition-all duration-300 hover:border-primary/40"
      aria-label="Toggle theme"
    >
      {/* Track */}
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
          isDark
            ? "translate-x-6 bg-primary"
            : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-white" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}
