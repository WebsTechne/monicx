// app/(root)/shop/categories/page.tsx
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCategories } from "@/lib/fetch/get-categories";

export default async function CategoriesPage() {
  // Direct DB calls — no fetch to /api
  const categories = (await getCategories()) ?? [];
  const firstSlug = categories.find((c) => c.slug !== "all")?.slug ?? "men";

  redirect(`/shop/categories/${encodeURIComponent(firstSlug)}`);
}
