import type { Metadata } from "next";
import MonicxBreadcrumbs from "@/components/elements/products/monicx-breadcrumbs";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: { slug: string | string[] };
}): Promise<Metadata> {
    const raw = params.slug;
    const slug = Array.isArray(raw) ? raw[0] : raw;
    if (!slug) return { title: "Collection not found" };

    const collection = decodeURIComponent(slug);
    if (!collection) return { title: "Collection not found" };

    return {
        title: `${collection} — Monicx`,
        description: `Shop from the latest ${collection} at Monicx.`,
    };
}

export default async function CollectionsSlugPage({
    params,
}: {
    params: { slug: string | string[] };
}) {
    const raw = params.slug;
    const slug = Array.isArray(raw) ? raw[0] : raw;
    if (!slug) notFound();

    const collection = decodeURIComponent(slug);
    if (!collection) notFound();

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Collections", href: "/shop/collections" },
        { name: collection, href: `/shop/${collection}` },
    ];

    return (
        <>
            <div>
                <MonicxBreadcrumbs items={breadcrumbItems} />
            </div>
        </>
    );
}
