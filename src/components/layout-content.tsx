"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SidebarProvider from "./sidebar-provider";

export default function LayoutContent({ children }: { children: ReactNode }) {
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
