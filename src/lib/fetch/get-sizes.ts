// lib/get-sizes.ts
import prisma from "@/lib/prisma";
import { cache } from "react";

const _getSizes = async () => {
  return prisma.size.findMany({
    select: {
      id: true,
      alpha: true,
      productSizeStock: true,
    },
    orderBy: { id: "asc" },
  });
};

export const getSizes = cache(_getSizes);
