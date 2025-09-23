"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductsType } from "@/types";
import Categories from "./categories";
import ProductCard from "./product-card";
import Link from "next/link";
import { products as PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Filter } from "./filter";

type Props = {
    allTab?: boolean;
    category?: string;
    serverItems?: ProductsType; // optional server-provided items (for SSR)
    page: string;
};

export default function ProductList({
    allTab,
    category,
    serverItems,
    page,
}: Props) {
    const detectCategoryFromLocation = () => {
        try {
            const sp = new URLSearchParams(location.search);
            const q = sp.get("category");
            if (q) return q;
            const m = location.pathname.match(/\/shop\/category\/([^\/?#]+)/);
            return m ? decodeURIComponent(m[1]) : undefined;
        } catch {
            return undefined;
        }
    };

    const initialCategory =
        category ??
        (typeof window !== "undefined"
            ? detectCategoryFromLocation()
            : undefined);

    const [activeCategory, setActiveCategory] = useState<string | undefined>(
        initialCategory,
    );

    // Items: if serverItems provided use them initially, otherwise use full PRODUCTS
    const [clientItems, setClientItems] = useState<ProductsType | undefined>(
        serverItems,
    );

    useEffect(() => {
        // If server provided items and category prop changed on client hydration, keep in sync
        if (serverItems) {
            setClientItems(serverItems);
        }
    }, [serverItems]);

    // event handlers for pushState and back/forward
    useEffect(() => {
        const onCategoryChange = (e: Event) => {
            const detail = (e as CustomEvent)?.detail;
            if (detail?.slug) {
                const slug = detail.slug === "all" ? undefined : detail.slug;
                setActiveCategory(slug);
                // If you previously had serverItems, we want to switch to client filtering
                setClientItems(undefined);
            }
        };

        const onPop = () => {
            const sp = new URLSearchParams(location.search);
            const qcat = sp.get("category");
            const m = location.pathname.match(/\/shop\/category\/([^\/?#]+)/);
            const slug = qcat ?? (m ? decodeURIComponent(m[1]) : undefined);
            setActiveCategory(slug);
            setClientItems(undefined);
        };

        window.addEventListener(
            "monicx:category-change",
            onCategoryChange as EventListener,
        );
        window.addEventListener("popstate", onPop);
        return () => {
            window.removeEventListener(
                "monicx:category-change",
                onCategoryChange as EventListener,
            );
            window.removeEventListener("popstate", onPop);
        };
    }, []);

    // Decide what to render: serverItems (if provided) OR client-side filtered PRODUCTS
    const items = useMemo<ProductsType>(() => {
        if (clientItems) return clientItems;
        if (!activeCategory) return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === activeCategory);
    }, [clientItems, activeCategory]);

    return (
        <div className="w-full">
            <Categories allTab={allTab || undefined} />

            {page === "shop" && <Filter />}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {items.map((product) => (
                    <ProductCard
                        key={product.slug ?? product.id}
                        product={product}
                    />
                ))}
            </div>
            <div className="mt-3 flex w-full items-center justify-end">
                <Button
                    variant="link"
                    className="text-muted-foreground hover:text-primary text-sm"
                    asChild
                >
                    <Link
                        href={
                            activeCategory
                                ? `/shop/category/${encodeURIComponent(activeCategory)}`
                                : "/shop"
                        }
                    >
                        View all products
                    </Link>
                </Button>
            </div>
        </div>
    );
}
