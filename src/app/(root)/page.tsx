import ProductList from "@/components/elements/products/product-list";
import AuthPromptDialog from "@/components/screens/auth-prompt-dialog";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
    return (
        <>
            <AuthPromptDialog />
            {/*  */}
            <div className="relative mb-12 aspect-3/1 w-full">
                <Image
                    src="/featured.png"
                    alt="Featured Product"
                    className="object-cover"
                    fill
                />
            </div>
            <Suspense fallback={<div>Loading products…</div>}>
                <ProductList page="homepage" />
            </Suspense>
        </>
    );
}
