// lib/get-collections.ts
import prisma from "@/lib/prisma";

async function getCollections() {
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
}

export { getCollections };
