// app/(root)/shop/categories/page.tsx  (server component)
import { redirect } from "next/navigation";
import { categories } from "@/lib/categories";

export default function Page() {
    const first = categories.find((c) => c.slug !== "all")?.slug ?? "t-shirts";
    redirect(`/shop/categories/${encodeURIComponent(first)}`);
}
