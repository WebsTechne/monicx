import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductListServer from "@/components/products/products-list.server";
import MonicxBreadcrumbs from "@/components/products/monicx-breadcrumbs";
import capitalize from "@/lib/helpers/capitalize";
import { getCollections } from "@/lib/fetch/get-collections";
import { metadataBase, siteName } from "@/app/metadata-base";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const collections = await getCollections();
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return {
      title: `Collection not found`,
      description: `Collection not found.`,
      metadataBase,
      robots: { index: false, follow: false },
    };
  }

  const title = `${collection?.name ?? slug}`;
  const description = `Shop ${collection?.name ?? slug} at ${siteName}. Curated clothing tailored to fit and style preferences.`;

  return {
    title,
    description,
    metadataBase,
    keywords: [collection?.name || ""],
    openGraph: {
      title,
      description,
      url: `/shop/categories/${slug}`,
      siteName,
      images: [collection?.imagePath ?? "/og/monicx-og-default.jpeg"],
      type: "website",
    },
    alternates: { canonical: `/shop/categories/${slug}` },
  };
}

export default async function CollectionsSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const raw = await params;
  const slug = raw.slug;
  if (!slug) notFound();

  const collection = decodeURIComponent(slug);
  if (!collection) notFound();
  const items = products.filter((p) => p.category === slug);

  const breadcrumbLoadingItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: collection, href: `/shop/${collection}` },
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
        Scan by Collection: {capitalize(slug)}
      </h1>
      <ProductListServer serverItems={items} category={slug} />
    </>
  );
}
