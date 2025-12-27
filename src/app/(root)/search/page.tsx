export const dynamic = "force-dynamic";

import { SearchClient } from "./search.client";
import { siteName } from "@/app/metadata-base";

export const metadata = {
  title: `Search — ${siteName}`,
  description:
    "Search Monicx for clothing, suits, tuxedos, and custom designs.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/search" },
};

export default function Page() {
  return <SearchClient />;
}
