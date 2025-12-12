import { ReactNode } from "react";
import type { Metadata } from "next";
import { GeistMono, GeistSans } from "geist/font";
import AppSidebar from "@/components/layout/admin/AppSidebar";
import AdminHeader from "@/components/layout/admin/AdminHeader";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin • Monicx",
  description: "Monicx admin dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "admin") return redirect("/403");

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // Keep classes that were on <body> but apply them to a wrapper div
  return (
    <div
      className={`${GeistSans.variable} ${GeistMono.variable} flex antialiased`}
      // className="flex"
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
          <AppSidebar session={session} />
          <main className="w-full">
            <AdminHeader session={session} />
            <div className="px-4">{children}</div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
