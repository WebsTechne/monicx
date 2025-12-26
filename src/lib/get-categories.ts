// lib/get-categories.ts
import prisma from "@/lib/prisma";

async function getCategories() {
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
}

export { getCategories };
