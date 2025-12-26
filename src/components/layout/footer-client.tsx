"use client";

import useMounted from "@/hooks/use-mounted";
import { useTheme } from "next-themes";
import IMAGES from "@/assets/images";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    />
  );
};

const FooterClient = () => {
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

export { FooterClient, FooterImage };
