// lib/get-colors.ts
import prisma from "@/lib/prisma";

export type ColorMinimal = {
    id: number;
    hexCode: string;
    name: string;
    groupName: string | null;
    productColors: { productId: string; colorId: number }[];
};

let cache: { ts: number; data: ColorMinimal[] } | null = null;
// Colors are mostly static for monicx — long TTL. Adjust as needed.
const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export async function getColors({ force = false } = {}): Promise<
    ColorMinimal[]
> {
    if (!force && cache && Date.now() - cache.ts < TTL_MS) {
        return cache.data;
    }

    const data = await prisma.color.findMany({
        select: {
            id: true,
            hexCode: true,
            name: true,
            groupName: true,
            productColors: true,
        },
        orderBy: { id: "asc" },
    });

    cache = { ts: Date.now(), data };
    return data;
}

/** Call this from admin POST/PUT/DELETE handlers after mutating colors */
export function invalidateColors() {
    cache = null;
}
