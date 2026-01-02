"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {} from "next/navigation";
import IMAGES from "@/assets/images";
import { Button, buttonVariants } from "@/components/ui/button";
import useMounted from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  BellIcon,
  MenuIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";

function useTrackInternalRoute() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lastInternalRoute", pathname);
    }
  }, [pathname]);
}

export function useBack(defaultRoute = "/") {
  const router = useRouter();

  const goBack = () => {
    const lastInternal = sessionStorage.getItem("lastInternalRoute");
    if (lastInternal) {
      router.push(lastInternal);
    } else {
      router.push(defaultRoute);
    }
  };

  return goBack;
}

const AccountHeader = () => {
  const mounted = useMounted();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const isMobile = true;

  const searchParams = useSearchParams();
  const back = searchParams.has("back") || searchParams.has("b");

  useTrackInternalRoute();
  const goBack = useBack("/");

  return (
    <header className="bg-card/80 sticky top-0 flex h-(--header-h) items-center justify-between px-1 backdrop-blur-md">
      <section className="flex h-full items-center justify-start gap-2.5">
        {back ? (
          <>
            <Button
              variant="ghost"
              onClick={goBack}
              className="header-icon p-0!"
            >
              <ArrowLeftIcon />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="nav:hidden! m-0 h-8! rounded-md! px-1! py-0!"
              // onClick={toggleSidebar}
              // aria-expanded={isMobile ? openMobile : undefined}
              aria-controls="sidebar-panel"
              // aria-label={
              // 	isMobile
              // 		? openMobile
              // 			? "Close navigation"
              // 			: "Open navigation"
              // 		: "Open navigation"
              // }
            >
              {!isMobile ? (
                <XIcon className="animate-in zoom-in size-5" />
              ) : (
                <MenuIcon className="animate-in zoom-in" />
              )}
            </Button>

            <Link href="/" className="flex h-full items-center">
              <Logo className="h-5/10" /> {/* sm:h-6/10 */}
            </Link>
          </>
        )}
      </section>

      <section className="relative flex h-full items-center justify-end gap-2.5">
        <Button variant="ghost" className="header-icon hidden sm:inline-flex">
          <BellIcon />
        </Button>

        <Link
          href="/account/settings?b"
          prefetch
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "header-icon relative",
          )}
        >
          <SettingsIcon />
        </Link>
      </section>
    </header>
  );
};

export { AccountHeader };
