// lib/get-sizes.ts
import prisma from "@/lib/prisma";

export type SizeMinimal = {
  id: number;
  alpha: string;
  productSizeStock: { productId: string; sizeId: number; qty: number }[];
};

let cache: { ts: number; data: SizeMinimal[] } | null = null;
// Sizes are mostly static for monicx — long TTL. Adjust as needed.
const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export async function getSizes({ force = false } = {}): Promise<SizeMinimal[]> {
  if (!force && cache && Date.now() - cache.ts < TTL_MS) {
    return cache.data;
  }

  const data = await prisma.size.findMany({
    select: {
      id: true,
      alpha: true,
      productSizeStock: true,
    },
    orderBy: { id: "asc" },
  });

  cache = { ts: Date.now(), data };
  return data;
}

/** Call this from admin POST/PUT/DELETE handlers after mutating sizes */
export function invalidateSizes() {
  cache = null;
}
