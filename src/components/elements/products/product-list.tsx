"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductsType } from "@/types";
import ProductCard from "./product-card";
import Link from "next/link";
import { products as PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import components that use useSearchParams
const DynamicCategories = dynamic(() => import("./categories"), {
  ssr: false,
  loading: () => <div>Loading categories…</div>,
});

const DynamicFilter = dynamic(
  () => import("./filter").then((mod) => ({ default: mod.Filter })),
  {
    ssr: false,
    loading: () => <div>Loading sort…</div>,
  },
);

type Props = {
  allTab?: boolean;
  category?: string;
  serverItems?: ProductsType; // optional server-provided items (for SSR)
  page: string;
};

export default function ProductList({
  allTab,
  category,
  serverItems,
  page,
}: Props) {
  const detectCategoryFromLocation = () => {
    if (typeof window === "undefined") return undefined;
    try {
      const sp = new URLSearchParams(location.search);
      const q = sp.get("category");
      if (q) return q;
      const m = location.pathname.match(/\/shop\/categories\/([^\/?#]+)/);
      return m ? decodeURIComponent(m[1]) : undefined;
    } catch {
      return undefined;
    }
  };

  const initialCategory = category ?? detectCategoryFromLocation();

  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    initialCategory,
  );

  // Items: if serverItems provided use them initially, otherwise use full PRODUCTS
  const [clientItems, setClientItems] = useState<ProductsType | undefined>(
    serverItems,
  );

  useEffect(() => {
    // If server provided items and category prop changed on client hydration, keep in sync
    if (serverItems) {
      setClientItems(serverItems);
    }
  }, [serverItems]);

  // event handlers for pushState and back/forward
  useEffect(() => {
    const onCategoryChange = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.slug) {
        const slug = detail.slug === "all" ? undefined : detail.slug;
        setActiveCategory(slug);
        // If you previously had serverItems, we want to switch to client filtering
        setClientItems(undefined);
      }
    };

    const onPop = () => {
      const sp = new URLSearchParams(location.search);
      const qcat = sp.get("category");
      const m = location.pathname.match(/\/shop\/categories\/([^\/?#]+)/);
      const slug = qcat ?? (m ? decodeURIComponent(m[1]) : undefined);
      setActiveCategory(slug);
      setClientItems(undefined);
    };

    window.addEventListener(
      "monicx:category-change",
      onCategoryChange as EventListener,
    );
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener(
        "monicx:category-change",
        onCategoryChange as EventListener,
      );
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  // Decide what to render: serverItems (if provided) OR client-side filtered PRODUCTS
  const items = useMemo<ProductsType>(() => {
    if (clientItems) return clientItems;
    if (!activeCategory) return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [clientItems, activeCategory]);

  return (
    <>
      <DynamicCategories allTab={allTab || undefined} />

      {page === "shop" && <DynamicFilter />}

      <div className="xs:grid-cols-2 grid grid-cols-1 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((product) => (
          <ProductCard key={product.slug ?? product.id} product={product} />
        ))}
      </div>
    </>
  );
}
