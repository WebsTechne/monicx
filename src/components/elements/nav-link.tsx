// components/NavLink.tsx
"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Link> & {
    activeClassName?: string;
    exact?: boolean; // exact match vs prefix match
    className?: string;
    exclude?: string | string[]; // prefixes to exclude from being considered active
};

function normalize(p: string) {
    if (!p) return "/";
    // strip query/hash already not present in usePathname, but remove trailing slash (except root)
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function NavLink({
    href,
    children,
    className,
    activeClassName = "text-primary!",
    exact = false,
    exclude,
    ...rest
}: Props) {
    const pathname = normalize(usePathname() || "/");
    const hrefStr = normalize(
        typeof href === "string" ? href : (href.pathname ?? "/"),
    );

    const excluded = (
        Array.isArray(exclude) ? exclude : exclude ? [exclude] : []
    ).map(normalize);

    // basic match
    const baseMatch = exact
        ? pathname === hrefStr
        : pathname === hrefStr ||
          pathname.startsWith(hrefStr + "/") ||
          pathname.startsWith(hrefStr);

    // check excludes: if any exclude-prefix matches the pathname, we consider it not active
    const isExcluded = excluded.some((ex) =>
        ex === "/" ? false : pathname === ex || pathname.startsWith(ex + "/"),
    );

    const isActive = baseMatch && !isExcluded;

    return (
        <Link
            href={href}
            className={cn(className, isActive && `active ${activeClassName}`)}
            aria-current={isActive ? "page" : undefined}
            {...rest}
        >
            {children}
        </Link>
    );
}
