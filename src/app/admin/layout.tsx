// src/app/admin/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppSidebar from "@/components/layout/admin/AppSidebar";
import Navbar from "@/components/layout/admin/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Admin • Monicx",
    description: "Monicx admin dashboard",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    // Keep classes that were on <body> but apply them to a wrapper div
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex antialiased`}
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
                    <AppSidebar />
                    <main className="w-full">
                        <Navbar />
                        <div className="px-4">{children}</div>
                    </main>
                </SidebarProvider>
            </ThemeProvider>
        </div>
    );
}
