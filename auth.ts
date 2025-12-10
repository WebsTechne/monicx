import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import authConfig from "./auth.config";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  providers: [GitHub, Google, Apple],
});
