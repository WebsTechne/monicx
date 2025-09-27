import Image from "next/image";
import Link from "next/link";
import useMounted from "@/hooks/use-mounted";
import IMAGES from "@/assets/images";
import { useTheme } from "next-themes";
import { Copyright } from "lucide-react";

const LINKS = [
    {
        name: "Links",
        links: [
            {
                name: "Homepage",
                href: "/",
            },
            {
                name: "Contact",
                href: "/contact",
            },
            {
                name: "Terms of Service",
                href: "/legal/terms",
            },
            {
                name: "Privacy Policy",
                href: "/legal/privacy",
            },
        ],
    },
    {
        name: "Products",
        links: [
            {
                name: "All Products",
                href: "/shop",
            },
            {
                name: "New Arrivals",
                href: "/shop?tab=new-arrivals",
            },
            {
                name: "Best Sellers",
                href: "/shop?tab=best-sellers",
            },
            {
                name: "Sales",
                href: "/shop?tab=sales",
            },
        ],
    },
    {
        name: "Company",
        links: [
            {
                name: "About",
                href: "/about",
            },
            {
                name: "Contact",
                href: "/contact",
            },
            {
                name: "Blog",
                href: "/blog",
            },
            {
                name: "Affiliate Program",
                href: "/affiliate-program",
            },
        ],
    },
];

export default function Footer() {
    const { resolvedTheme } = useTheme();
    const mounted = useMounted();
    const isDark = mounted && resolvedTheme === "dark";
    const thisYear = new Date().getFullYear();

    return (
        <footer className="bg-sidebar flex flex-col items-center gap-8 p-8 md:flex-row md:items-start md:justify-between md:gap-0">
            <section className="flex flex-col items-center gap-2 md:items-start md:gap-4">
                <Link href="/" className="flex w-max items-center gap-1">
                    <span className="relative aspect-3/2 h-6 rounded-md md:h-9">
                        <Image
                            className="object-cover"
                            src={isDark ? IMAGES.logo.dark : IMAGES.logo.light}
                            alt="Monicx logo"
                            fill
                        />
                    </span>
                    <p className="text-md m-0! hidden font-medium tracking-wider md:block">
                        Monicx
                    </p>
                </Link>
                <p className="text-muted-foreground m-0! flex items-center text-sm">
                    <Copyright
                        className="size-(--text-sm)"
                        aria-hidden="true"
                    />
                    <span className="leading-tight">{thisYear} Monicx.</span>
                    <span className="sr-only">
                        Copyright {thisYear} Monicx.
                    </span>
                </p>
                <p className="text-muted-foreground m-0! text-sm">
                    All rights preserved.
                </p>
            </section>

            <nav aria-label="Footer links" className="contents">
                {LINKS.map((linkGroup) => (
                    <ul
                        key={linkGroup.name}
                        className="text-muted-foreground flex flex-col items-center gap-2 md:items-start md:gap-4"
                    >
                        <p className="text-sidebar-foreground m-0! text-sm font-semibold">
                            {linkGroup.name}
                        </p>
                        {linkGroup.links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="hover:text-sidebar-foreground/80"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </nav>
        </footer>
    );
}
