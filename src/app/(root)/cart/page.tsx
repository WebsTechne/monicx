export const dynamic = "force-dynamic";

import { siteName } from "@/app/metadata-base";
import { CartClient } from "./cart.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Cart`,
  description:
    "Your shopping cart on Monicx. Review items, update quantities, and proceed to checkout.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cart" },
  openGraph: {
    title: `Cart — ${siteName}`,
    description: "Your shopping cart on Monicx.",
    url: "/cart",
    siteName,
    // images: ["/og/cart.png"],
  },
};

export default function () {
  return <CartClient />;
}
