"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/layout/header";
import SplashScreen from "@/components/screens/splash-screen";

import SearchCommandMenu from "@/components/screens/search-command-menu";
import Footer from "@/components/layout/footer";

export default function Layout({
  searchParams,
  children,
}: {
  children: ReactNode;
  searchParams?: { query?: string; q?: string };
}) {
  const [splashActive, setSplashActive] = useState(true);

  const query = searchParams?.query ?? searchParams?.q ?? "";

  useEffect(() => {
    setSplashActive(false);
  }, []);

  return (
    <>
      {/* Basic Page Elements */}
      <Header query={query} />

      <main className="bg-background mx-auto min-h-[calc(.6*100dvh)] overflow-x-clip px-2.5 pt-7 pb-3.75 transition-[width] duration-200 sm:max-w-[590px] sm:px-0! md:max-w-4xl md:px-3.75 lg:max-w-5xl xl:max-w-6xl">
        {children}
      </main>

      <Footer />
      {/*  */}
      {/*  */}
      {/* Extra Page Components */}
      <SplashScreen active={splashActive} />
      <SearchCommandMenu />
    </>
  );
}
