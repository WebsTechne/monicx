import { ReactNode } from "react";
import Header from "@/components/layout/header";
import SearchCommandMenu from "@/components/screens/search-command-menu";
import Footer from "@/components/layout/footer";

export default async function Layout({
  searchParams,
  children,
}: {
  children: ReactNode;
  searchParams?: { query?: string; q?: string };
}) {
  const query = searchParams?.query ?? searchParams?.q ?? "";

  const res1 = await fetch(`/api/categories?limit=200`, {
    cache: "force-cache", // for durable caching
  });
  const categories = (await res1.json()).data ?? [];

  const res2 = await fetch(`/api/collections?limit=200`, {
    cache: "force-cache", // for durable caching
  });
  const collections = (await res2.json()).data ?? [];

  return (
    <>
      {/* Basic Page Elements */}
      <Header query={query} appData={{ categories, collections }} />

      <main className="bg-background mx-auto min-h-[calc(.6*100dvh)] overflow-x-clip px-2.5 pt-7 pb-3.75 transition-[width] duration-200 sm:max-w-[590px] sm:px-0! md:max-w-4xl md:px-3.75 lg:max-w-5xl xl:max-w-6xl">
        {children}
      </main>

      <Footer />

      {/* Extra Page Components */}
      <SearchCommandMenu />
    </>
  );
}
