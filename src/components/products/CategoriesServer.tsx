"use server";

import CategoriesClient from "./CategoriesClient";

export default async function CategoriesServer({
  allTab = true,
  categoryBasePath = "/shop/categories",
}: {
  allTab?: boolean;
  categoryBasePath?: string;
}) {
  // fetch once on the server. Use cache controls:
  // - force-cache: cached (fast)
  // - next.revalidate: ISR (revalidate every Xs)
  const res = await fetch(`/api/categories?limit=200`, {
    cache: "force-cache", // for durable caching
    // or next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  const categories = (await res.json()).data ?? [];

  // Pass the data to a thin client component for interactivity
  return (
    <CategoriesClient
      categories={categories}
      allTab={allTab}
      categoryBasePath={categoryBasePath}
    />
  );
}
