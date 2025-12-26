// app/(root)/shop/categories/page.tsx
import { Category } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories?limit=200`,
    {
      cache: "force-cache",
    },
  );
  const categories = (await res.json()).data ?? [];

  const firstSlug =
    categories.find((c: Category) => c.slug !== "all")?.slug ?? "men";
  redirect(`/shop/categories/${encodeURIComponent(firstSlug)}`);
}
