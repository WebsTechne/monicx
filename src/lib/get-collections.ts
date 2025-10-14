// lib/get-collections.ts
import prisma from "@/lib/prisma";
import type { Collection } from "@prisma/client";

export type CollectionMinimal = Pick<
    Collection,
    "id" | "name" | "slug" | "description" | "imagePath"
>;

let cache: { ts: number; data: CollectionMinimal[] } | null = null;
// Collections are mostly static for monicx — long TTL. Adjust as needed.
const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export async function getCollections({ force = false } = {}): Promise<
    CollectionMinimal[]
> {
    if (!force && cache && Date.now() - cache.ts < TTL_MS) {
        return cache.data;
    }

    const data = await prisma.collection.findMany({
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

/** Call this from admin POST/PUT/DELETE handlers after mutating collections */
export function invalidateCollections() {
    cache = null;
}
