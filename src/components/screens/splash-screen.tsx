"use client";

import Image from "next/image";
import React from "react";
import IMAGES from "@/assets/images";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import useMounted from "@/hooks/use-mounted";

const SplashScreen = ({ active }: { active?: boolean }) => {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "bg-background pointer-events-none fixed top-0 left-0 z-1000 flex h-[100dvh] w-[100vw] opacity-0 duration-300",
        active && "active pointer-events-auto opacity-100",
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center">
        {mounted ? (
          <Image
            src={isDark ? IMAGES.logo.circleDark : IMAGES.logo.circleLight}
            alt="logo"
            className="m-0! max-w-[150px] animate-pulse object-cover"
          />
        ) : (
          /* lightweight placeholder: same size to avoid CLS */
          <div className="height-[150px] aspect-1 bg-muted rounded-full" />
        )}

        {/* <h1 className="m-0! p-0! font-black">MONICX</h1>
        <span className="m-0! p-0!">Fashion House</span> */}
      </div>
    </div>
  );
};

export default SplashScreen;
