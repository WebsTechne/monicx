// app/(root)/shop/page.tsx  (server component)
import { products } from "@/lib/products";
import ProductList from "@/components/elements/products/product-list";
import Categories from "@/components/elements/products/categories";
import Image from "next/image";

export const metadata = {
    title: "Shop — All Products",
    description: "Browse all products",
};

export default function ShopPage({
    searchParams,
}: {
    searchParams?: Record<string, string | string[]>;
}) {
    // If the page is loaded with ?category=slug we can server-filter for SEO
    const q =
        typeof searchParams?.category === "string"
            ? searchParams.category
            : undefined;
    const serverItems = q ? products.filter((p) => p.category === q) : products;

    return (
        <div className="w-full">
            {/* hero or banner (optional) */}
            <div className="relative mb-8 aspect-[3/1] w-full">
                <Image
                    src="/featured.png"
                    alt="Featured"
                    fill
                    className="object-cover"
                />
            </div>

            {/* categories: force query-mode here so clicking applies ?category=slug and triggers router navigation */}

            {/* product list: render serverItems so initial HTML is filtered when ?category is present */}
            <ProductList serverItems={serverItems} category={q} page="shop" />
        </div>
    );
}
