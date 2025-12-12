import type { NextAuthConfig } from "next-auth";
export default {
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.name = user.name ?? "";
        token.role = (user as any).role ?? "customer"; // be defensive
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        // expose role to client (minimal info only)
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
