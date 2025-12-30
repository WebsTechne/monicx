import { ReactNode } from "react";
import Header from "@/components/layout/header";
import SearchCommandMenu from "@/components/screens/search-command-menu";
import Footer from "@/components/layout/footer";
import { getCategories } from "@/lib/fetch/get-categories";
import { getCollections } from "@/lib/fetch/get-collections";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CompleteProfileDialog } from "@/components/screens/profile-prompt-dialog";
import { AuthSession } from "../layout";

export default async function Layout({
  searchParams,
  children,
}: {
  children: ReactNode;
  searchParams?: { query?: string; q?: string };
}) {
  const query = searchParams?.query ?? searchParams?.q ?? "";

  // Direct DB calls — no fetch to /api
  const categories = (await getCategories()) ?? [];
  const collections = (await getCollections()) ?? [];

  const rawSession = await auth.api.getSession({
    headers: await headers(),
  });

  const session: AuthSession = rawSession
    ? {
        ...rawSession,
        user: {
          ...rawSession.user,
          role: rawSession.user.role ?? "customer",
        },
      }
    : null;

  return (
    <>
      {/* Basic Page Elements */}
      <Header
        query={query}
        appData={{ categories, collections }}
        session={session}
      />

      <main className="bg-background mx-auto min-h-[calc(.6*100dvh)] overflow-x-clip px-3 pt-7 pb-3.75 transition-[width] duration-200 sm:max-w-[590px] md:max-w-4xl md:px-3.75 lg:max-w-5xl xl:max-w-6xl">
        {children}
      </main>

      <Footer />

      {/* Extra Page Components */}
      <SearchCommandMenu />
      <CompleteProfileDialog />
    </>
  );
}
