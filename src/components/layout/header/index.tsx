"use client";

// React
import { useState } from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

// External libraries
import {
  Bell,
  Menu,
  Search,
  SearchX,
  X,
  Heart,
  SunIcon,
  MoonIcon,
} from "lucide-react";

// Internal assets, hooks, components, utils
import IMAGES from "@/assets/images";
import { useIsMobile } from "@/hooks/use-mobile-custom";
import useMounted from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useSidebar } from "../../providers/sidebar-provider";

import SearchForm from "../../elements/search-form";
import CartIcon from "../../elements/cart-icon";
import ProfileButton from "../../elements/account-button";
import Navbar from "../navbar";
import { Button, buttonVariants } from "../../ui/button";
import { Category, Collection } from "@prisma/client";
import { ThemeToggle } from "@/components/elements/theme-toggle";
import { AuthSession } from "@/app/layout";
import { usePathname, useSearchParams } from "next/navigation";

export type AppData = {
  categories: Category[];
  collections: Collection[];
};

export default function Header({
  query,
  appData,
  session,
}: {
  query: string;
  appData: AppData;
  session: AuthSession;
}) {
  const mounted = useMounted();
  const { resolvedTheme, theme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const [smSearchShow, setSmSearchShow] = useState(false);

  const isMobile = useIsMobile(1100);
  const { toggleSidebar, openMobile, setOpenMobile } = useSidebar();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnTo =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  return (
    <header className="header-bg flex-center sticky top-0 z-98 flex">
      <div
        className={cn(
          "nav:px-7 flex h-16 w-full items-center justify-between gap-3.5 py-2.5 md:gap-4.5",
          "px-3 sm:max-w-[590px] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl",
        )}
      >
        {/* //////    LOGO    //// */}
        <section className="flex h-full items-center justify-start gap-2.5">
          <Button
            variant="ghost"
            className="nav:hidden! m-0 h-8! rounded-md! px-1! py-0!"
            onClick={toggleSidebar}
            aria-expanded={isMobile ? openMobile : undefined}
            aria-controls="sidebar-panel"
            aria-label={
              isMobile
                ? openMobile
                  ? "Close navigation"
                  : "Open navigation"
                : "Open navigation"
            }
          >
            {isMobile ? (
              openMobile ? (
                <X className="animate-in zoom-in size-5" />
              ) : (
                <Menu className="animate-in zoom-in size-5" />
              )
            ) : (
              <Menu className="animate-in zoom-in" />
            )}
          </Button>
          <Link href="/" className="flex h-full items-center gap-1.25">
            {mounted ? (
              <div className="relative aspect-3/2 h-5/10 sm:h-6/10">
                <Image
                  src={isDark ? IMAGES.logo.dark : IMAGES.logo.light}
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-muted/40 aspect-3/2 h-5/10 rounded-sm sm:h-6/10" />
            )}
            <span className="text-lg leading-7 font-light sm:text-2xl">
              monicx
            </span>
          </Link>
        </section>

        <Navbar appData={appData} />

        {/* //////    BUTTONS & PROFILE    //// */}
        <section className="search:min-w-60 flex-center flex h-full max-w-120 flex-1">
          <SearchForm
            query={query}
            className="search:flex hidden h-full flex-1 items-center"
          />
        </section>

        <section
          className={`nav:gap-3 relative flex h-full items-center justify-end ${session ? "gap-1.5" : "gap-2.5"}`}
        >
          <Button
            variant="ghost"
            className="header-icon search:hidden"
            onClick={() => setSmSearchShow((s) => !s)}
          >
            {smSearchShow ? <SearchX /> : <Search />}
          </Button>

          {/* THEME TOGGLE */}
          <ThemeToggle className="header-icon" />

          {session ? (
            <>
              <Button
                variant="ghost"
                className="header-icon hidden sm:inline-flex"
              >
                <Bell />
              </Button>
              <Link
                href="/wishlist"
                prefetch
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "header-icon",
                )}
                onClick={() => {
                  setOpenMobile(false);
                }}
              >
                <Heart />
              </Link>
              <CartIcon />
              <ProfileButton session={session} returnTo={returnTo || ""} />
            </>
          ) : (
            <>
              <Link
                href={`/auth/sign-in?returnTo=${encodeURIComponent(returnTo)}`}
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Sign in
              </Link>

              <Link
                href={`/auth/sign-up?returnTo=${encodeURIComponent(returnTo)}`}
                className={cn(
                  buttonVariants({
                    variant: "default",
                  }),
                  "hidden md:inline-block",
                )}
              >
                Sign up
              </Link>
            </>
          )}
        </section>

        <section
          className={cn(
            "search:pointer-events-none search:opacity-0 header-bg pointer-events-auto absolute top-full left-0 h-full w-full border-b-1 py-2 transition-all duration-300",
            !mounted || !isMobile || !smSearchShow
              ? "pointer-events-none! opacity-0!"
              : `pointer-events-auto opacity-100`,
          )}
        >
          <div className="mx-auto flex h-full w-full items-center gap-2.5 px-2.5 sm:max-w-[590px] md:max-w-4xl md:px-0! lg:max-w-5xl xl:max-w-6xl">
            <div className="h-9/10 w-full">
              <SearchForm query={query} />
            </div>
            <Button
              variant="ghost"
              className="aspect-1 h-full rounded-full border-none p-3 outline-0"
              onClick={() => setSmSearchShow((s) => !s)}
            >
              <X className="text-foreground size-full" />
            </Button>
          </div>
        </section>
      </div>
    </header>
  );
}
