"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SidebarProvider from "./providers/sidebar-provider";

import {
    CategoriesProvider,
    CollectionsProvider,
    SizesProvider,
    ColorsProvider,
} from "@/context/providers";

import type { CategoryMinimal } from "@/lib/get-categories";
import type { CollectionMinimal } from "@/lib/get-collections";
import type { SizeMinimal } from "@/lib/get-sizes";
import type { ColorMinimal } from "@/lib/get-colors";

export default function LayoutContent({
    children,
    initialCategories,
    initialCollections,
    initialSizes,
    initialColors,
}: {
    children: ReactNode;
    initialCategories: CategoryMinimal[];
    initialCollections: CollectionMinimal[];
    initialSizes: SizeMinimal[];
    initialColors: ColorMinimal[];
}) {
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
                            toast: "rounded-2xl!",
                            actionButton: "rounded-lg!",
                        },
                    }}
                />
                <CategoriesProvider initial={initialCategories}>
                    <CollectionsProvider initial={initialCollections}>
                        <SizesProvider initial={initialSizes}>
                            <ColorsProvider initial={initialColors}>
                                {children}
                            </ColorsProvider>
                        </SizesProvider>
                    </CollectionsProvider>
                </CategoriesProvider>
            </SidebarProvider>
        </ThemeProvider>
    );
}
