import type { Metadata } from "next";
import { products as PRODUCTS } from "@/lib/products";
import {} from "react";
import ProductCard from "@/components/elements/products/product-card";

export function generateMetadata(): Metadata {
    return { title: "Your wishlist @ Monicx" };
}

const wishlist = PRODUCTS.filter((p) => p.wishlist === true);

export default function Page() {
    return (
        <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 2xl:grid-cols-5">
                {wishlist.map((p) => (
                    <ProductCard
                        product={p}
                        wishlistPage={true}
                        key={p.slug || p.id}
                    />
                ))}
            </div>
        </>
    );
}
