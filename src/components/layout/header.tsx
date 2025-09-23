"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import IMAGES from "@/assets/images";
import useMounted from "@/hooks/use-mounted";
import { useIsMobile } from "@/hooks/use-mobile-custom";
import SearchForm from "../elements/search-form";
import Navbar from "./navbar/navbar";
import { Button } from "../ui/button";
import { Bell, Menu, Search, SearchX, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../sidebar-provider";
import CartIcon from "../elements/cart-icon";
import { ThemeToggle } from "../elements/theme-toggle";

type User = {
    isUser?: boolean;
    firstName?: string;
    lastName?: string;
    image?: string | null;
} | null;

export default function Header({ query }: { query: string }) {
    const mounted = useMounted();
    const { setTheme, resolvedTheme } = useTheme();
    const isDark = mounted && resolvedTheme === "dark";
    const isMobile = useIsMobile(1100);
    const [smSearchShow, setSmSearchShow] = useState(false);

    const theme = resolvedTheme;
    const toggleThemes = () => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
    };

    const user: User = {
        isUser: true,
        firstName: "Triumph",
        lastName: "Aidenojie",
        image: "https://github.com/evilrabbit.png", // "https://randomuser.me/api/portraits/men/75.jpg", //,
    };

    const initials =
        user?.firstName &&
        user.firstName.charAt(0).toUpperCase() +
            (user?.lastName && user.lastName.charAt(0).toUpperCase());

    const { toggleSidebar, openMobile } = useSidebar();

    return (
        <header className="bg-background nav:px-7 sticky top-0 z-98 flex h-16 w-full items-center justify-between gap-3.5 px-3.75 py-2.5 md:gap-4.5">
            {/* bg-background/65 backdrop-blur-sm */}
            <section className="flex h-full items-center justify-start gap-2.5">
                <Button
                    variant="ghost"
                    className="nav:hidden! m-0 h-8! rounded-md! p-0!"
                    onClick={toggleSidebar}
                    aria-expanded={isMobile ? openMobile : undefined}
                    aria-controls="sidebar-panel"
                    aria-label={
                        isMobile
                            ? openMobile
                                ? "Close navigation"
                                : "Open navigation"
                            : "Open navigation"
                    }
                >
                    {isMobile ? (
                        openMobile ? (
                            <X className="animate-in zoom-in size-5" />
                        ) : (
                            <Menu className="animate-in zoom-in size-5" />
                        )
                    ) : (
                        <Menu className="animate-in zoom-in" />
                    )}
                </Button>

                <Link href="/" className="flex h-full items-center gap-1.25">
                    {mounted ? (
                        <div className="relative aspect-3/2 h-5/10 sm:h-6/10">
                            <Image
                                src={
                                    isDark
                                        ? IMAGES.logo.dark
                                        : IMAGES.logo.light
                                }
                                alt="logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="bg-muted/40 aspect-3/2 h-5/10 rounded-sm sm:h-6/10" />
                    )}
                    <span className="text-lg leading-7 font-light sm:text-2xl">
                        monicx
                    </span>
                </Link>
            </section>

            <section className="flex h-full items-center justify-start">
                <Navbar />
            </section>

            <section className="search:min-w-60 flex h-full max-w-120 flex-1 items-center justify-center">
                <SearchForm
                    query={query}
                    className="search:flex hidden h-full flex-1 items-center"
                />
            </section>

            <section
                className={`nav:gap-3 relative flex h-full items-center justify-end ${user.isUser ? "gap-1.5" : "gap-2.5"}`}
            >
                <Button
                    variant="ghost"
                    className="header-icon search:hidden"
                    onClick={() => setSmSearchShow((s) => !s)}
                >
                    {smSearchShow ? <SearchX /> : <Search />}
                </Button>

                {user.isUser ? (
                    <>
                        <Button variant="ghost" className="header-icon">
                            <Bell />
                        </Button>

                        {/* <Button variant="ghost" className="header-icon">
                            <ShoppingCart />
                            </Button> */}
                        <CartIcon />

                        <ThemeToggle>
                            <Avatar className="ring-ring/50 size-9 duration-300 hover:ring-[5px]">
                                <AvatarImage
                                    src={user.image || ""}
                                    alt={`${user.firstName ?? ""} ${user.lastName ?? ""}`}
                                ></AvatarImage>
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </ThemeToggle>
                    </>
                ) : (
                    <>
                        <Button
                            className="hidden sm:inline-block"
                            variant="ghost"
                            asChild
                        >
                            <Link href="/auth/signin">Sign in</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/auth/signup">Sign up</Link>
                        </Button>
                    </>
                )}
            </section>

            <section
                className={cn(
                    "search:pointer-events-none search:opacity-0 pointer-events-auto absolute top-full left-0 flex h-full w-full gap-2.5 border-b-1 bg-inherit px-3 py-2 opacity-100 transition-[opacity] duration-300",
                    !mounted || !isMobile || !smSearchShow
                        ? "pointer-events-none! opacity-0!"
                        : `pointer-events-auto opacity-100`,
                )}
            >
                <div className="h-9/10 w-9/10 max-w-120">
                    <SearchForm
                        query={query}
                        className={cn(
                            "duration-300",
                            !mounted || !isMobile || !smSearchShow
                                ? "scale-90"
                                : `scale-100`,
                        )}
                    />
                </div>
                <Button
                    variant="ghost"
                    className="aspect-1 h-full rounded-full border-none p-3 outline-0"
                    onClick={() => setSmSearchShow((s) => !s)}
                >
                    <X className="text-foreground size-full" />
                </Button>
            </section>
        </header>
    );
}
