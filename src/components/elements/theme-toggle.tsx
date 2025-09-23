"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";

type ThemeValue = "light" | "dark" | "system";

export function ThemeToggle({ children }: { children: ReactNode }) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [value, setValue] = useState<ThemeValue>("system");

    useEffect(() => {
        const t = (theme as ThemeValue) || "system";
        setValue(t);
    }, [theme]);

    function onChange(v: string) {
        const tv = v as ThemeValue;
        setValue(tv);
        setTheme(tv);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="z-1000! mr-2 min-w-46">
                <DropdownMenuLabel className="text-muted-foreground">
                    Theme
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                    <DropdownMenuRadioItem value="light">
                        <SunIcon className="size-5" />
                        Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                        <MoonIcon className="size-5" />
                        Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                        {resolvedTheme === "dark" ? (
                            <MoonIcon className="size-5" />
                        ) : (
                            <SunIcon className="size-5" />
                        )}
                        System
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
