export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { SearchClient } from "./search.client";
import { siteName } from "@/app/metadata-base";

export const metadata: Metadata = {
  title: `Search`,
  description:
    "Search Monicx for clothing, suits, tuxedos, and custom designs.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/search" },
};

export default function Page() {
  return <SearchClient />;
}
