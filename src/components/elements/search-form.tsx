"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Form from "next/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useMounted from "@/hooks/use-mounted";
import { useIsMobile } from "@/hooks/use-mobile-custom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleX, Command, Search, X } from "lucide-react";

export default function SearchForm({
    query, // keep as optional prop fallback if you like
    className,
    ...props
}: {
    query?: string;
    className?: string;
}) {
    const mounted = useMounted();

    const formRef = useRef<HTMLFormElement | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMobile = useIsMobile(500);

    // initial local state — prefer reading from actual URL when available
    const [value, setValue] = useState(query ?? "");

    // Sync input from URL when on /search — handles direct loads and client NAVs.
    useEffect(() => {
        if (pathname === "/search") {
            const q = searchParams?.get("q") ?? "";
            setValue(q);
        } else {
            // clear input on other pages, or keep it (your choice)
            setValue("");
        }
        // Intentionally depend on pathname and searchParams.toString() so effect runs when query changes
    }, [pathname, searchParams?.toString()]);

    const reset = () => {
        // If you want clearing to stay on the same page and just clear input:
        setValue("");
        if (formRef.current) formRef.current.reset();
    };

    return (
        <Form
            action="/search"
            scroll={false}
            className={cn("search-form relative h-full w-full", className)}
            ref={formRef}
            {...props}
        >
            <span className="pointer-events-none absolute top-1/2 grid h-full w-11 -translate-y-1/2 place-items-center">
                <Search className="text-muted-foreground size-5" />
            </span>

            <Input
                name="q"
                value={value ?? ""}
                type="search"
                onChange={(e) => setValue(e.target.value)}
                className="z-0 h-full w-full [appearance:textfield] rounded-full! px-9.5 shadow-none! dark:border-0! [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                placeholder="Search products"
                autoComplete="off"
                spellCheck={false}
                aria-label="Search products"
            />

            <div className="absolute top-1/2 right-2 flex h-full -translate-y-1/2 items-center gap-0.5">
                {value?.trim() ? (
                    <button
                        type="reset"
                        className="aspect-1 hover:bg-foreground/10 grid h-55/100 place-items-center duration-300 hover:rounded-full"
                        onClick={reset}
                    >
                        <span className="grid place-items-center">
                            <CircleX
                                className="text-muted-foreground animate-in zoom-in [animation-duration]:800 size-4.5"
                                strokeWidth={2}
                            />
                        </span>
                    </button>
                ) : null}

                {/* <Button
                    type="submit"
                    className="text-foreground flex h-8/10 items-center gap-2 rounded-full"
                >
                    Go
                    {mounted && !isMobile ? (
                        <span className="text-muted-foreground flex items-center gap-[1.5px]">
                            <Command className="size-3.75" /> K
                        </span>
                    ) : null}
                </Button> */}
            </div>
        </Form>
    );
}
