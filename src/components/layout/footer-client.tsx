"use client";

import useMounted from "@/hooks/use-mounted";
import { useTheme } from "next-themes";
import IMAGES from "@/assets/images";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FooterImage = () => {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Image
      className="object-cover"
      src={isDark ? IMAGES.logo.dark : IMAGES.logo.light}
      alt="Monicx logo"
      fill
      sizes="(min-width: 768px) 36px, 24px"
    />
  );
};

const FooterYear = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <span className="leading-tight">{year ?? ""} Monicx.</span>
      <span className="sr-only">Copyright {year ?? ""} Monicx.</span>
    </>
  );
};

const FooterThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const buttons = [
    { name: "system", icon: MonitorIcon, onClick: () => setTheme("system") },
    { name: "dark", icon: MoonIcon, onClick: () => setTheme("dark") },
    { name: "light", icon: SunIcon, onClick: () => setTheme("light") },
  ];

  return (
    <div className="bg-sidebar-border flex items-center gap-1 rounded-full p-1">
      {buttons.map((btn, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "flex-center size-6 rounded-full",
            theme === btn.name
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-muted-foreground bg-transparent",
          )}
          onClick={btn.onClick}
        >
          <btn.icon className="size-4" />
        </button>
      ))}
    </div>
  );
};

export { FooterYear, FooterImage, FooterThemeToggle };
