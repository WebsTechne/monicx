"use server";

import { signIn, signOut } from "../../auth";

type AuthProvider = "google" | "apple";

export const logIn = async (provider: AuthProvider) => {
  await signIn(provider, { redirectTo: "/" });
};

export const logOut = async () => {
  await signOut({ redirectTo: "/auth/sign-in" });
};
