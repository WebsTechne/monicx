import { products } from "@/lib/products";
import ProductList from "@/components/elements/products/product-list";

export default function CategorySlugPage({
    params,
}: {
    params: { slug: string };
}) {
    const slug = params.slug;
    const items = products.filter((p) => p.category === slug);

    return (
        <>
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
