import { siteName } from "@/app/metadata-base";
import { SignUpClient } from "./sign-up.client";

export const metadata = {
  title: `Create account — ${siteName}`,
  description:
    "Join Monicx today and start exploring the latest fashion, tailored just for you. Signing up is fast and easy!",
  metadataBase: new URL("https://monicxed.com"),
  robots: { index: false, follow: false },
  alternates: { canonical: "/auth/sign-up" },
  openGraph: {
    title: `Create account — ${siteName}`,
    description:
      "Sign up and get access to Monicx’s curated collections and exclusive deals.",
    url: "/auth/sign-up",
    siteName,
    // images: ["/og/auth-signup.png"], // optional custom OG image
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Create account — ${siteName}`,
  },
};

export default function Page() {
  return <SignUpClient />;
}
