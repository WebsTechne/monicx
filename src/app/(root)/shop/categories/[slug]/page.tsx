import { products } from "@/lib/products";
import ProductList from "@/components/elements/products/product-list";
import { Metadata } from "next";
import MonicxBreadcrumbs from "@/components/elements/products/monicx-breadcrumbs";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const raw = params.slug;
    const slug = decodeURIComponent(raw);

    return {
        title: `${slug} category @ Monicx`,
        description: `Browse our many products under the ${slug} category @ Monicx`,
    };
}

export default function CategorySlugPage({
    params,
}: {
    params: { slug: string };
}) {
    const slug = params.slug;
    const items = products.filter((p) => p.category === slug);

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: slug, href: `/shop/categories/${slug}` },
    ];

    return (
        <>
            <div>
                <MonicxBreadcrumbs items={breadcrumbItems} />
            </div>
            <h1 className="mb-3 text-2xl! md:text-4xl">
                Scan by Category: {slug}
            </h1>
            <ProductList
                allTab={false}
                serverItems={items}
                category={slug}
                page="shop"
            />
        </>
    );
}
