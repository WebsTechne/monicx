import Image from "next/image";
import ProductListServer from "@/components/products/products-list.server";
import CategoriesServer from "@/components/products/categories.server";
import { ShopViewAll } from "@/components/elements/shop-view-all";

export default function Home() {
  return (
    <>
      {/* {!session ? <AuthPromptDialog /> : null} */}

      <div className="relative mb-12 aspect-3/1 w-full">
        <Image
          src="/featured.png"
          alt="Featured Product"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 590px, (max-width: 1024px) 896px, (max-width: 1280px) 1024px, 1280px"
        />
      </div>
      <CategoriesServer />
      <ProductListServer />
      <div className="mt-3 flex w-full items-center justify-end">
        <ShopViewAll />
      </div>
    </>
  );
}
