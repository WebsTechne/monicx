import { Suspense } from "react";
import type { ProductsType } from "@/types";
import { products as PRODUCTS } from "@/lib/products";
import ProductGridClient from "./product-grid.client";
import ProductGridSkeleton from "./product-grid-skeleton";

export const revalidate = 60;

type Props = {
  serverItems?: ProductsType;
  category?: string | null;
};

export default function ProductListServer({ serverItems, category }: Props) {
  const items = serverItems ?? PRODUCTS;

  // normalize incoming category slug
  const cat = category ? String(category).trim().toLowerCase() : null;

  // filter by category slug. Adjust the property checks if your product shape differs.
  const filtered =
    cat && cat !== "all"
      ? items.filter((p) => {
          // support multiple possible shapes gracefully:
          const slug = (
            p.category ??
            (p.category && (p.category as any).slug) ??
            ""
          )
            .toString()
            .toLowerCase();
          return slug === cat;
        })
      : items;

  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGridClient items={filtered} />
    </Suspense>
  );
}
