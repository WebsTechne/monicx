import { siteName } from "@/app/metadata-base";
import { ForgotPasswordClient } from "./forgot-password.client";

export const metadata = {
  title: `Forgot password`,
  description:
    "Reset your Monicx password. Enter your email and we'll send a secure link to get you back into your account.",
  metadataBase: new URL("https://monicxed.vercel.app"),
  robots: { index: false, follow: false },
  alternates: { canonical: "/auth/forgot-password" },
  openGraph: {
    title: `Forgot password — ${siteName}`,
    description: "Reset your password quickly and securely.",
    url: "/auth/forgot-password",
    siteName,
    // images: ["/og/auth-forgot.png"], // replace
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Forgot password — ${siteName}`,
  },
};

export default function Page() {
  return <ForgotPasswordClient />;
}
