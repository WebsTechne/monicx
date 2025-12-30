import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";

export const auth = betterAuth({
  ///// Register custom user fields so better-auth knows about them
  user: {
    additionalFields: {
      // keep firstName/lastName so you can remove the 'name' field in Prisma if you want
      firstName: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true, // allow user input (e.g. profile form)
      },
      lastName: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true,
      },
      role: {
        type: ["customer", "admin", "vendor"],
        required: false,
        defaultValue: "customer",
        input: false, // don't allow user to set role from forms
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true,
      },
    },
  },

  ///// Setup
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  ///// Advanced
  advanced: { database: { generateId: () => crypto.randomUUID() } },

  ///// Email & Password
  emailAndPassword: { enabled: true, autoSignIn: true },

  ///// Social providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },

  ///// Plugins
  plugins: [nextCookies()],
});
