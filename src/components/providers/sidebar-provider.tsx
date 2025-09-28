// sidebar-provider.tsx — mobile-only version
"use client";

import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useCallback,
} from "react";
import { useIsMobile } from "@/hooks/use-mobile-custom";

type SidebarContextProps = {
    isMobile: boolean;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | undefined>(
    undefined,
);

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx)
        throw new Error("useSidebar must be used within <SidebarProvider/>");
    return ctx;
}

export default function SidebarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = useIsMobile();

    // only care about mobile open/close state for the simplified provider
    const [openMobile, setOpenMobile] = useState(false);

    const toggleSidebar = useCallback(() => {
        if (isMobile) setOpenMobile((s) => !s);
        // intentionally no desktop state; desktop nav is a row and doesn't collapse
    }, [isMobile]);

    const value = useMemo(
        () => ({
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [isMobile, openMobile, toggleSidebar],
    );

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
}
