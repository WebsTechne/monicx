// lib/get-collections.ts
import prisma from "@/lib/prisma";
import { cache } from "react";

const _getCollections = async () => {
  return prisma.collection.findMany({
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

export const getCollections = cache(_getCollections);
