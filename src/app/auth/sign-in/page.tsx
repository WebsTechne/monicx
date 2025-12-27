import { siteName } from "@/app/metadata-base";
import { SignInClient } from "./sign-in.client";

export const metadata = {
  title: `Sign in — ${siteName}`,
  description:
    "Welcome back! Log in to your Monicx account to shop, track orders, and enjoy your favorite styles.",
  metadataBase: new URL("https://monicxed.com"),
  robots: { index: false, follow: false },
  alternates: { canonical: "/auth/sign-in" },
  openGraph: {
    title: `Sign in — ${siteName}`,
    description: "Access your Monicx account quickly and securely.",
    url: "/auth/sign-in",
    siteName,
    // images: ["/og/auth-signin.png"], // optional custom OG image
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Sign in — ${siteName}`,
  },
};

export default function Page() {
  return <SignInClient />;
}
