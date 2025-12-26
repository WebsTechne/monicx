// src/app/components/CategoriesClient.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IMAGES from "@/assets/images";
import type { Category } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function refresh() {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/categories?limit=200", {
        cache: "no-store", // client-side fresh fetch
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setCategories(json.data ?? json);
    } finally {
      setIsRefreshing(false);
    }
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-muted mb-4 rounded-lg p-4 text-sm">
        No categories configured.
        <button
          onClick={refresh}
          className="ml-2 underline"
          aria-busy={isRefreshing}
        >
          Try refresh
        </button>
      </div>
    );
  }
  // ---------- NEW: navigation + active-detection helpers ----------
  const pathname = usePathname();
  const router = useRouter();

  // Normalize base so trailing slashes don't break matching
  const normalize = (p: string | undefined | null) =>
    (p ?? "").replace(/\/+$/, "") || "/";

  const base = normalize(categoryBasePath);
  const normalizedPath = normalize(pathname ?? "/");

  function getActiveSlugFromPath(p?: string | null) {
    if (!p) return null;
    const cleaned = p.split("?")[0]; // strip query params if any
    // ensure cleaned path starts with exact base
    // allow either exact base or base + "/" + slug
    if (!cleaned.startsWith(base)) return null;
    const after = cleaned.slice(base.length);
    const parts = after.split("/").filter(Boolean);
    return parts.length > 0 ? parts[0] : null;
  }

  const activeSlug = getActiveSlugFromPath(pathname);
  const isAllActive = normalizedPath === "/shop";

  async function handleChange(slug?: string | null) {
    // clicking "All" -> go to shop root
    if (!slug) {
      // user asked: "all button leads to shop" so /shop it is
      return router.push("/shop");
    }

    // path-style: `${base}/${slug}`
    const dest = `${base}/${encodeURIComponent(slug)}`;
    return router.push(dest);
  }
  // ---------- END helpers ----------

  return (
    <div className="mb-4 flex gap-1.5 overflow-x-auto overflow-y-clip rounded-lg text-sm">
      {/* All tab */}
      <Button
        variant="ghost"
        type="button"
        className="flex-center flex h-max! w-max! cursor-pointer flex-col gap-1 rounded-xl p-2"
        onClick={() => {
          void handleChange(null);
        }}
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
      </Button>

      {categories.map((c) => {
        const isActive = activeSlug === c.slug;

        return (
          <Button
            variant="ghost"
            key={c.slug}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleChange(c.slug)}
            className={cn(
              "flex-center flex h-max! w-max! cursor-pointer flex-col gap-1 rounded-xl p-2",
              isActive
                ? "bg-primary/70 text-background"
                : "text-muted-foreground",
            )}
          >
            <span className="relative inline-block aspect-square h-10.5 overflow-clip rounded-full">
              {/* guard src: Next/Image will crash if src is empty */}
              <Image
                src={c.imagePath || ""}
                alt={c.name}
                fill
                sizes="42px"
                className="bg-muted/40 pointer-events-none object-cover"
              />
            </span>
            {c.name}
          </Button>
        );
      })}
    </div>
  );
}
