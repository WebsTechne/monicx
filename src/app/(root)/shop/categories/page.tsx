// app/(root)/shop/categories/page.tsx
"use client";

import { redirect } from "next/navigation";
import { useCategoriesData } from "@/context/providers";

export default function Page() {
    const { data: categories } = useCategoriesData();

    const first = categories.find((c) => c.slug !== "all")?.slug ?? "men";
    redirect(`/shop/categories/${encodeURIComponent(first)}`);
}
