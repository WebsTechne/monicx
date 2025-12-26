// lib/get-categories.ts
import prisma from "@/lib/prisma";
import { cache } from "react";

const _getCategories = async () => {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imagePath: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getCategories = cache(_getCategories);
