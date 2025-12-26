// lib/get-colors.ts
import prisma from "@/lib/prisma";
import { cache } from "react";

const _getColors = async () => {
  return prisma.color.findMany({
    select: {
      id: true,
      hexCode: true,
      name: true,
      groupName: true,
      productColors: true,
    },
    orderBy: { id: "asc" },
  });
};

export const getColors = cache(_getColors);
