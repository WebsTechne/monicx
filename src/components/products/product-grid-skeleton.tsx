import { ProductCardSkeleton } from "./product-card";

// components/products/product-grid-skeleton.tsx
export default function ProductGridSkeleton() {
  const cols = 8; // how many skeleton cards to show
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: cols }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
