import Image from "next/image";
import ProductListServer from "@/components/products/products-list.server";
import CategoriesServer from "@/components/products/categories.server";
import { ShopButton } from "@/components/elements/shop-button";

export const metadata = {
  title: "Shop — All Products",
  description: "Browse all products",
};

export default async function ShopPage() {
  return (
    <div className="w-full">
      {/* hero or banner (optional) */}
      <div className="relative mb-12 aspect-3/1 w-full">
        <Image
          src="/featured.png"
          alt="Featured"
          fill
          className="object-cover"
        />
      </div>

      <CategoriesServer />
      <ProductListServer />
      <div className="mt-3 flex w-full items-center justify-end">
        <ShopButton />
      </div>
    </div>
  );
}
