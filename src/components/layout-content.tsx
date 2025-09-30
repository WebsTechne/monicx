"use client";

import { ReactNode } from "react";
import { useTheme } from "next-themes";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SidebarProvider from "./providers/sidebar-provider";

export default function LayoutContent({ children }: { children: ReactNode }) {
    const { theme } = useTheme();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            <SidebarProvider>
                <Toaster
                    position="bottom-right"
                    // @ts-ignore
                    // theme={theme}
                    theme="system"
                    richColors
                    toastOptions={{
                        classNames: {
                            toast: "rounded-xl!",
                        },
                    }}
                />
                {children}
            </SidebarProvider>
        </ThemeProvider>
    );
}
