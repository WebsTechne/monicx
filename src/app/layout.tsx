// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import LayoutContent from "@/components/layout-content";
import type { Session, User } from "better-auth";
import { defaultOGImage, metadataBase, siteName } from "./metadata-base";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#262624" },
  ],
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteName,
    template: "%s — Monicx", // pages using `title: "X"` will become "X — Monicx"
  },
  description:
    "Monicx — Tailored clothing and curated collections made in Nigeria. Suits, casual wear, and custom orders with a local touch.",
  keywords: [
    "Monicx",
    "tailoring Nigeria",
    "tailored suits",
    "custom clothing",
    "made in Nigeria",
  ],
  authors: [{ name: "Monicx", url: "https://monicxed.vercel.app" }],
  creator: "Monicx",
  publisher: "Monicx",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Open Graph defaults (pages may override)
  openGraph: {
    title: siteName,
    description:
      "Shop tailored clothing and ready-to-wear from Monicx — local craftsmanship and modern style.",
    url: metadataBase.toString(),
    siteName,
    images: [
      {
        url: "/og/monicx-og-default.jpeg",
        width: 1200,
        height: 630,
        alt: "Monicx — Tailored clothing made in Nigeria",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Monicx — tailored clothing and curated collections made in Nigeria.",
    images: [
      {
        url: "/og/monicx-og-default.jpeg",
        width: 1200,
        height: 630,
        alt: "Monicx — Tailored clothing made in Nigeria",
      },
    ],

    creator: "@monicx", // change or remove
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  // manifest: "/site.webmanifest", // optional
};

const nunitoSans = localFont({
  src: [
    {
      path: "../assets/fonts/nunito-sans-variable.ttf",
      style: "normal",
    },
    {
      path: "../assets/fonts/nunito-sans-italic-variable.ttf",
      style: "italic",
    },
  ],
  variable: "--font-nunito-sans",
});

export type ServerSession = typeof auth.$Infer.Session | null;

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${nunitoSans.variable} antialiased`}
        suppressHydrationWarning
      >
        {<LayoutContent>{children}</LayoutContent>}
      </body>
    </html>
  );
}
