// lib/get-sizes.ts
import prisma from "@/lib/prisma";
import { cache } from "react";

const _getUserInternal = async (userId: string) => {
  if (!userId) return null;

  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      orders: { select: { id: true } },
    },
  });
};

export const getUserInternal = cache(_getUserInternal);
