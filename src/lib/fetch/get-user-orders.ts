// lib/get-user-orders.ts
import prisma from "@/lib/prisma";

export const getUserOrders = async (userId: string) => {
  if (!userId) return [];

  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      totalAmt: true,
      status: true,
      items: true,
      offers: true,
      createdAt: true,
    },
  });
};
