// src/app/components/CategoriesClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IMAGES from "@/assets/images";
import type { Category } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon } from "lucide-react";

export default function CategoriesClient({
  categories: initialCategories,
  allTab = true,
  categoryBasePath,
}: {
  categories: Category[];
  allTab?: boolean;
  categoryBasePath: string;
}) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const pathname = usePathname();
  const router = useRouter();

  if (!categories || categories.length === 0) {
    return (
      <div
        id="categoriesSelector"
        className="header-bg sticky top-(--header-h) z-999 mb-4 flex h-[97px] w-full items-center gap-4 border border-dashed py-1.5"
      >
        Refresh
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            router.refresh();
          }}
        >
          <RefreshCwIcon />
          Refresh
        </Button>
      </div>
    );
  }

  const normalize = (p: string | undefined | null) =>
    (p ?? "").replace(/\/+$/, "") || "/";

  const base = normalize(categoryBasePath);
  const normalizedPath = normalize(pathname ?? "/");

  function getActiveSlugFromPath(p?: string | null) {
    if (!p) return null;
    const cleaned = p.split("?")[0];
    if (!cleaned.startsWith(base)) return null;
    const after = cleaned.slice(base.length);
    const parts = after.split("/").filter(Boolean);
    return parts.length > 0 ? parts[0] : null;
  }

  const activeSlug = getActiveSlugFromPath(pathname);
  const isAllActive = normalizedPath === "/shop";

  async function handleChange(slug?: string | null) {
    if (!slug) {
      return router.push("/shop");
    }
    const dest = `${base}/${encodeURIComponent(slug)}`;
    return router.push(dest);
  }

  // ---------- directional overflow indicators ----------
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      // defensive: ensure numbers are valid
      const { scrollLeft, clientWidth, scrollWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 to avoid tiny rounding issues
    };

    // run once on mount / categories change
    update();

    // scroll listener
    el.addEventListener("scroll", update, { passive: true });

    // window resize as fallback
    window.addEventListener("resize", update);

    // ResizeObserver for content changes (images loading, children changes)
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        update();
      });
      ro.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (ro) ro.disconnect();
    };
  }, [categories.length]); // categories length should be enough to trigger re-check when items change

  // helper scroll functions
  const scrollLeft = (amount = 200) =>
    scrollerRef.current?.scrollBy({ left: -amount, behavior: "smooth" });
  const scrollRight = (amount = 200) =>
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });

  return (
    <section className="header-bg sticky top-(--header-h) z-999 mb-4 w-full py-1.5">
      {/* Left indicator */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 h-full w-12 transition-opacity",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="from-background h-full w-full bg-gradient-to-r to-transparent" />
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-start">
          <button
            className="bg-secondary text-secondary-foreground flex-center pointer-events-auto aspect-square h-7 rounded-full"
            type="button"
            onClick={() => scrollLeft(240)}
            aria-hidden={!canScrollLeft}
          >
            <ArrowLeftIcon />
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollerRef}
        className="scrollbar-width-none flex gap-1.5 overflow-x-auto overflow-y-clip rounded-lg text-sm"
      >
        {/* All tab */}
        <Link
          href="/shop"
          type="button"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex-center flex h-max! w-max! cursor-pointer flex-col gap-1 rounded-xl p-2",
            isAllActive
              ? "bg-accent text-accent-foreground dark:bg-accent/50 border-primary border"
              : "text-muted-foreground",
          )}
          aria-pressed={isAllActive}
        >
          <span className="relative inline-block aspect-square h-10.5 overflow-clip rounded-full">
            <Image
              src={IMAGES.logo.light}
              alt="All Products"
              fill
              sizes="42px"
              className="pointer-events-none bg-gray-50 object-cover"
            />
          </span>
          All
        </Link>

        {categories.map((c) => {
          const isActive = activeSlug === c.slug;
          return (
            <Link
              key={c.slug}
              href={`${categoryBasePath}/${encodeURIComponent(c.slug)}`}
              aria-pressed={isActive}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex-center flex h-max! w-max! cursor-pointer flex-col gap-1 rounded-xl p-2",
                isActive
                  ? "bg-accent text-accent-foreground dark:bg-accent/50 border-primary border"
                  : "text-muted-foreground",
              )}
            >
              <span className="relative inline-block aspect-square h-10.5 overflow-clip rounded-full">
                <Image
                  src={c.imagePath || ""}
                  alt={c.name}
                  fill
                  sizes="42px"
                  className="bg-muted/40 pointer-events-none object-cover"
                />
              </span>
              {c.name}
            </Link>
          );
        })}
      </div>

      {/* Right indicator */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-0 z-10 h-full w-12 transition-opacity",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="from-background h-full w-full bg-gradient-to-l to-transparent" />
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-end">
          <button
            className="bg-secondary text-secondary-foreground flex-center pointer-events-auto aspect-square h-7 rounded-full"
            type="button"
            onClick={() => scrollRight(240)}
            aria-hidden={!canScrollRight}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
