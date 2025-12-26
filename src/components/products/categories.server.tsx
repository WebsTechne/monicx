"use server";

import { getCategories } from "@/lib/fetch/get-categories";
import CategoriesClient from "./categories.client";

export default async function CategoriesServer({
  allTab = true,
  categoryBasePath = "/shop/categories",
}: {
  allTab?: boolean;
  categoryBasePath?: string;
}) {
  const categories = (await getCategories()) ?? [];

  // Pass the data to a thin client component for interactivity
  return (
    <CategoriesClient
      categories={categories}
      allTab={allTab}
      categoryBasePath={categoryBasePath}
    />
  );
}
