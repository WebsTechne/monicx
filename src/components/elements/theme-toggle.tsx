"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeToggle = ({
  className,
  variant = "ghost",
  size = "icon",
}: {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "icon" | "sm" | "lg" | "default";
}) => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      type="button"
      className={cn("transition-none", className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <span className="group">
          <SunIcon
            // strokeWidth={1.5}
            className="size-6 transition-transform duration-150 ease-out will-change-transform"
          />
        </span>
      ) : (
        <span className="group">
          <MoonIcon
            // strokeWidth={1.5}
            className="size-6 transition-transform duration-150 ease-out will-change-transform"
          />
        </span>
      )}
    </Button>
  );
};

export { ThemeToggle };
