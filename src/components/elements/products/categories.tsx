"use client";

import { JSX, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Footprints,
    Glasses,
    Briefcase,
    Shirt,
    ShoppingBasket,
    Hand,
    Venus,
} from "lucide-react";

import { categories as SharedCategories } from "@/lib/categories";

const IconMap: Record<string, JSX.Element> = {
    ShoppingBasket: <ShoppingBasket className="h-4 w-4" />,
    Shirt: <Shirt className="h-4 w-4" />,
    Footprints: <Footprints className="h-4 w-4" />,
    Glasses: <Glasses className="h-4 w-4" />,
    Briefcase: <Briefcase className="h-4 w-4" />,
    Venus: <Venus className="h-4 w-4" />,
    Hand: <Hand className="h-4 w-4" />,
};

type Props = {
    allTab?: boolean;
    routeType?: "auto" | "query" | "path";
    categoryBasePath?: string;
};

export default function Categories({
    allTab = true,
    routeType = "auto",
    categoryBasePath = "/shop/category",
}: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname() || "/";

    const getSlugFromPath = useCallback(() => {
        if (!pathname) return null;
        const base = categoryBasePath.replace(/\/+$/, "");
        if (!pathname.startsWith(base)) return null;
        const rest = pathname.slice(base.length).replace(/^\/+/, "");
        const slug = rest.split("/")[0];
        return slug ? decodeURIComponent(slug) : null;
    }, [pathname, categoryBasePath]);

    const selectedCategory = useMemo(
        () => searchParams.get("category") || getSlugFromPath() || "all",
        [searchParams, getSlugFromPath],
    );

    const shouldUsePathRouting = useCallback(() => {
        if (routeType === "path") return true;
        if (routeType === "query") return false;
        return pathname.includes(categoryBasePath);
    }, [routeType, pathname, categoryBasePath]);

    const handleChange = useCallback(
        (value: string) => {
            const usePath = shouldUsePathRouting();
            const currentParams = new URLSearchParams(searchParams.toString());

            if (usePath) {
                // path-mode: update URL only (no Next.js navigation) so you can filter client-side
                currentParams.delete("category");
                const suffix = currentParams.toString()
                    ? `?${currentParams.toString()}`
                    : "";
                const shopRoot =
                    categoryBasePath.replace(/\/category\/?$/i, "") || "/shop";

                const newUrl =
                    value === "all"
                        ? `${shopRoot}${suffix}`
                        : `${categoryBasePath}/${encodeURIComponent(value)}${suffix}`;

                if (typeof window !== "undefined") {
                    // update the URL bar only
                    window.history.pushState({}, "", newUrl);

                    // dispatch a custom event so other client code can react
                    window.dispatchEvent(
                        new CustomEvent("monicx:category-change", {
                            detail: { slug: value, url: newUrl },
                        }),
                    );
                }
                return;
            }

            // query-mode (filtering pages like /search or /shop with query params)
            if (value === "all") currentParams.delete("category");
            else currentParams.set("category", value);

            const query = currentParams.toString();
            router.push(query ? `${pathname}?${query}` : pathname, {
                scroll: false,
            });
        },
        [
            shouldUsePathRouting,
            searchParams,
            categoryBasePath,
            pathname,
            router,
        ],
    );

    return (
        <div className="bg-muted mb-4 grid grid-cols-2 gap-2 rounded-lg p-1.5 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {SharedCategories.map((c) => {
                if (c.slug === "all" && !allTab) return null;
                const isActive = c.slug === selectedCategory;
                const icon = IconMap[c.iconName] ?? (
                    <ShoppingBasket className="h-4 w-4" />
                );
                return (
                    <button
                        key={c.slug}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => handleChange(c.slug)}
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 ${
                            isActive
                                ? "bg-foreground text-background"
                                : "text-muted-foreground"
                        }`}
                    >
                        {icon} {c.name}
                    </button>
                );
            })}
        </div>
    );
}
