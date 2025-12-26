// app/(root)/shop/collections/page.tsx
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCollections } from "@/lib/fetch/get-collections";

export default async function Page() {
  // Direct DB calls — no fetch to /api
  const collections = (await getCollections()) ?? [];
  const firstSlug = collections.find((c) => c.slug !== "all")?.slug ?? "men";

  redirect(`/shop/collections/${encodeURIComponent(firstSlug)}`);
}
