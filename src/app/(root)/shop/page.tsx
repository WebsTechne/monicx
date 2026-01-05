import Image from "next/image";
import ProductListServer from "@/components/products/products-list.server";
import CategoriesServer from "@/components/products/categories.server";
import { metadataBase, siteName } from "@/app/metadata-base";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shop`,
  description:
    "Shop tailored clothing and ready-to-wear from Monicx — locally made in Nigeria. Browse suits, casual wear, and custom orders.",
  metadataBase,
  keywords: [
    "Monicx",
    "Nigerian tailoring",
    "suits",
    "tuxedos",
    "custom clothing",
    "made in Nigeria",
  ],
  openGraph: {
    title: `Shop — ${siteName}`,
    description:
      "Shop tailored clothing and ready-to-wear from Monicx — locally made in Nigeria.",
    url: "/shop",
    siteName,
    images: [`${metadataBase}/og/monicx-og-default.jpeg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Shop — ${siteName}`,
    images: [
      {
        url: `${metadataBase}/og/monicx-og-default.jpeg`,
        width: 1200,
        height: 630,
        alt: "Monicx — Tailored clothing made in Nigeria",
      },
    ],
  },
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  return (
    <div className="w-full">
      {/* hero or banner (optional) */}
      <div className="relative mb-12 aspect-3/1 w-full">
        <Image
          src="/featured.png"
          alt="Featured Product"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 590px, (max-width: 1024px) 896px, (max-width: 1280px) 1024px, 1280px"
        />
      </div>

      <CategoriesServer />
      <ProductListServer />
      {/*<div className="mt-3 flex w-full items-center justify-end"></div>*/}
    </div>
  );
}
