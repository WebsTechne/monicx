import AuthPromptDialog from "@/components/screens/auth-prompt-dialog";
import Image from "next/image";
import ProductListServer from "@/components/products/products-list.server";
import CategoriesServer from "@/components/products/categories.server";
import { ShopViewAll } from "@/components/elements/shop-view-all";
import { CompleteProfileDialog } from "@/components/screens/profile-prompt-dialog";

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
          loading="eager"
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
