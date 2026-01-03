// lib/get-sizes.ts
import prisma from "@/lib/prisma";
import { cache } from "react";

const _getSizes = async () => {
  return prisma.size.findMany({
    select: {
      id: true,
      alpha: true,
      gender: true,
      chestCm: true,
      waistCm: true,
      productSizeStock: true,
    },
    orderBy: { id: "asc" },
  });
};

export const getSizes = cache(_getSizes);
