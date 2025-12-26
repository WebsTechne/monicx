import AuthPromptDialog from "@/components/screens/auth-prompt-dialog";
import Image from "next/image";
import ProductListServer from "@/components/products/products-list.server";
import CategoriesServer from "@/components/products/categories.server";
import { ShopButton } from "@/components/elements/shop-button";

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
        />
      </div>
      <CategoriesServer />
      <ProductListServer />
      <div className="mt-3 flex w-full items-center justify-end">
        <ShopButton />
      </div>
    </>
  );
}
