// lib/get-categories.ts
import prisma from "@/lib/prisma";
import type { Category } from "@prisma/client";

export type CategoryMinimal = Pick<
    Category,
    "id" | "name" | "slug" | "description" | "imagePath"
>;

let cache: { ts: number; data: CategoryMinimal[] } | null = null;
// Categories are mostly static for monicx — long TTL. Adjust as needed.
const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export async function getCategories({ force = false } = {}): Promise<
    CategoryMinimal[]
> {
    if (!force && cache && Date.now() - cache.ts < TTL_MS) {
        return cache.data;
    }

    const data = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            imagePath: true,
        },
        orderBy: { createdAt: "desc" },
    });

    cache = { ts: Date.now(), data };
    return data;
}

/** Call this from admin POST/PUT/DELETE handlers after mutating categories */
export function invalidateCategories() {
    cache = null;
}
