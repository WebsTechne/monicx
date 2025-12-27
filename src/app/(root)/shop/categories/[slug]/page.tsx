import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/lib/products";
import ProductListServer from "@/components/products/products-list.server";
import MonicxBreadcrumbs from "@/components/products/monicx-breadcrumbs";
import capitalize from "@/lib/helpers/capitalize";
import { getCategories } from "@/lib/fetch/get-categories";
import { metadataBase, siteName } from "@/app/metadata-base";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  const title = `${category?.name ?? slug} — ${siteName}`;
  const description = `Shop ${category?.name ?? slug} at ${siteName}. Curated clothing tailored to fit and style preferences.`;

  return {
    title,
    description,
    metadataBase,
    keywords: [category?.name || ""],
    openGraph: {
      title,
      description,
      url: `/shop/categories/${slug}`,
      siteName,
      images: [category?.imagePath ?? "/og/monicx-og-default.jpeg"],
      type: "website",
    },
    alternates: { canonical: `/shop/categories/${slug}` },
  };
}

export default async function CategorySlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const items = products.filter((p) => p.category === slug);

  const breadcrumbLoadingItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: capitalize(slug) },
  ];

  return (
    <>
      <div>
        <Suspense
          fallback={<MonicxBreadcrumbs items={breadcrumbLoadingItems} />}
        >
          <MonicxBreadcrumbs items={breadcrumbItems} />
        </Suspense>
      </div>
      <h1 className="mb-3 text-2xl! md:text-4xl">
        Scan by Category: {capitalize(slug)}
      </h1>
      <ProductListServer serverItems={items} category={slug} />
    </>
  );
}
