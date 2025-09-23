import ProductList from "@/components/elements/products/product-list";
import AuthPromptDialog from "@/components/screens/auth-prompt-dialog";
import Image from "next/image";

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
            <ProductList page="homepage" />
        </>
    );
}
