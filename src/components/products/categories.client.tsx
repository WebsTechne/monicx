// app/components/categories.client.tsx
"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";

// props contain the pre-fetched data
export default function CategoriesClient({
  initialCategories,
  allTab = true,
}: {
  initialCategories: any[];
  allTab?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = useMemo(
    () =>
      searchParams.get("category") ||
      (() => {
        const m = pathname?.match(/\/shop\/categories\/([^\/?#]+)/);
        return m ? decodeURIComponent(m[1]) : "all";
      })(),
    [searchParams, pathname],
  );

  const handleChange = useCallback(
    (value: string) => {
      // same logic you had: update history, dispatch event, or router.push
      const usePath =
        typeof window !== "undefined" && pathname?.includes("/shop/categories");

      const params = new URLSearchParams(searchParams.toString());
      if (usePath) {
        params.delete("category");
        const suffix = params.toString() ? `?${params.toString()}` : "";
        const shopRoot = "/shop";
        const newUrl =
          value === "all"
            ? `${shopRoot}${suffix}`
            : `/shop/categories/${encodeURIComponent(value)}${suffix}`;
        window.history.pushState({}, "", newUrl);
        window.dispatchEvent(
          new CustomEvent("monicx:category-change", {
            detail: { slug: value, url: newUrl },
          }),
        );
        return;
      }

      if (value === "all") params.delete("category");
      else params.set("category", value);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, searchParams, router],
  );

  return (
    <div className="mb-4 flex gap-1.5 overflow-x-auto rounded-lg text-sm">
      {allTab && (
        <Button
          variant="ghost"
          onClick={() => handleChange("all")}
          aria-pressed={selectedCategory === "all"}
        >
          <span className="relative inline-block h-10.5 w-10.5 overflow-hidden rounded-full">
            s
          </span>
          All
        </Button>
      )}

      {initialCategories.map((c) => {
        if (c.slug === "all" && !allTab) return null;
        return (
          <Button
            key={c.slug}
            variant="ghost"
            onClick={() => handleChange(c.slug)}
            aria-pressed={selectedCategory === c.slug}
          >
            <Image src={c.imagePath} alt={c.name} fill />

            {c.name}
          </Button>
        );
      })}
    </div>
  );
}
