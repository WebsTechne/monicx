"use client";

import { JSX, useCallback, useMemo, Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCategoriesData } from "@/context/providers";
import {
    Footprints,
    Glasses,
    Briefcase,
    Shirt,
    ShoppingBasket,
    Hand,
    Venus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IMAGES from "@/assets/images";

type Category = {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    imagePath?: string | null;
    // optional field if you ever add iconName on categories
    iconName?: string | null;
};

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

function CategoriesContent({
    allTab = true,
    routeType = "auto",
    categoryBasePath = "/shop/categories",
}: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname() || "/";

    const {
        data: categories = [],
        refresh,
        isRefreshing,
    } = useCategoriesData() as {
        data: Category[];
        setData?: (d: Category[]) => void;
        refresh: () => Promise<void>;
        isRefreshing: boolean;
    };

    // If provider started with empty data, try to refresh once on mount.
    useEffect(() => {
        if ((!categories || categories.length === 0) && refresh) {
            (async () => {
                try {
                    await refresh();
                } catch (err) {
                    // swallow — provider will log
                    console.error("categories refresh failed", err);
                }
            })();
        }
        // intentionally only run on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                currentParams.delete("category");
                const suffix = currentParams.toString()
                    ? `?${currentParams.toString()}`
                    : "";
                const shopRoot =
                    categoryBasePath.replace(/\/categories\/?$/i, "") ||
                    "/shop";

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

    if (categories.length === 0) {
        return (
            <div className="bg-muted mb-4 rounded-lg p-4 text-sm">
                No categories configured.{" "}
                {refresh && (
                    <button
                        onClick={() => refresh()}
                        className="ml-2 underline"
                        aria-busy={isRefreshing}
                    >
                        Try refresh
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="mb-4 flex gap-1.5 overflow-x-auto overflow-y-clip rounded-lg text-sm">
            {/* ALL */}
            <Button
                variant="ghost"
                type="button"
                // aria-pressed={isActive}
                onClick={() => handleChange("all")}
                className={cn(
                    "btn flex h-max! w-max! cursor-pointer flex-col items-center justify-center gap-1 rounded-xl p-2",
                )}
            >
                <span className="relative inline-block aspect-square h-10.5 overflow-clip rounded-full">
                    <Image
                        src={IMAGES.logo.light}
                        alt="All Products"
                        fill
                        sizes="42px"
                        className="pointer-events-none bg-gray-50 object-cover"
                    />
                </span>
                All
            </Button>

            {categories.map((c, index) => {
                if (c.slug === "all" && !allTab) return null;
                const isActive = c.slug === selectedCategory;
                const icon =
                    (c.iconName && IconMap[c.iconName.toLowerCase()]) ??
                    (c.imagePath ? (
                        <span className="relative inline-block aspect-square h-10.5 overflow-clip rounded-full">
                            {/* guard src: Next/Image will crash if src is empty */}
                            <Image
                                src={c.imagePath}
                                alt={c.name}
                                fill
                                sizes="42px"
                                className="bg-muted/40 pointer-events-none object-cover"
                            />
                        </span>
                    ) : (
                        <ShoppingBasket className="h-4 w-4" />
                    ));

                return (
                    <Button
                        variant="ghost"
                        key={c.slug}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => handleChange(c.slug)}
                        className={cn(
                            "btn flex h-max! w-max! cursor-pointer flex-col items-center justify-center gap-1 rounded-xl p-2",
                            isActive
                                ? "bg-foreground text-background"
                                : "text-muted-foreground",
                        )}
                    >
                        {icon} {c.name}
                    </Button>
                );
            })}
        </div>
    );
}

export default function Categories(props: Props) {
    return (
        <Suspense fallback={<div>Loading categories…</div>}>
            <CategoriesContent {...props} />
        </Suspense>
    );
}
