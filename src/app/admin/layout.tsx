import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppSidebar from "@/components/layout/admin/AppSidebar";
import AdminHeader from "@/components/layout/admin/AdminHeader";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies, headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { getColors } from "@/lib/fetch/get-colors";
import { getSizes } from "@/lib/fetch/get-sizes";
import { getCollections } from "@/lib/fetch/get-collections";
import { getCategories } from "@/lib/fetch/get-categories";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Admin • Monicx",
  description: "Monicx admin dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) notFound();
  const user = session?.user;
  if (user.role !== "admin") notFound();

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const categories = (await getCategories()) ?? [];
  const collections = (await getCollections()) ?? [];
  const colors = (await getColors()) ?? [];
  const sizes = (await getSizes()) ?? [];

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} admin-dashboard flex antialiased`}
      // className="admin-dashboard flex antialiased"
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider defaultOpen={defaultOpen}>
          <Toaster
            position="bottom-right"
            theme="system"
            richColors
            toastOptions={{
              classNames: { toast: "rounded-xl!" },
            }}
          />
          {/* <AppSidebar session={session} data={{categories,collections,colors,sizes}} /> */}
          <main className="w-full">
            {/* <AdminHeader session={session} /> */}
            <div className="px-4">{children}</div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
