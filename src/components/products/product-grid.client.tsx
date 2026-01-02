// components/products/product-grid.client.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProductsType } from "@/types";
import { ProductCard } from "./product-card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Button, buttonVariants } from "../ui/button";
import { RefreshCwIcon, StoreIcon } from "lucide-react";

type Props = {
  items: ProductsType;
};

export default function ProductGridClient({ items }: Props) {
  const { refresh } = useRouter();

  if (!items || items.length === 0) {
    return (
      <Empty className="from-muted/50 to-background rounded-2xl bg-gradient-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <StoreIcon />
          </EmptyMedia>
          <EmptyTitle>Looks like this shelf is empty</EmptyTitle>
          <EmptyDescription>
            We couldn’t find any products that match your selection.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button variant="outline" className="btn" onClick={refresh}>
              <RefreshCwIcon /> Try again
            </Button>
            <Link
              href="/shop"
              className={buttonVariants({
                variant: "outline",
                className: "btn",
              })}
            >
              Shop
            </Link>
          </div>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((product) => (
        <ProductCard key={product.slug ?? product.id} product={product} />
      ))}
    </div>
  );
}
