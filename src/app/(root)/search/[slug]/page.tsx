import { metadataBase, siteName } from "@/app/metadata-base";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug?: string };
  searchParams: { q?: string };
}): Promise<Metadata> {
  const query = params.slug ?? searchParams.q ?? "";
  return {
    title: `Search results for "${query}" — ${siteName}`,
    description: `Search results for "${query}" on ${siteName}. Find local tailors, suits, accessories, and more.`,
    metadataBase,
    robots: { index: false, follow: false },
    alternates: { canonical: `/search/${encodeURIComponent(query)}` },
  };
}

export default function SearchResults() {
  return <div className=""></div>;
}
