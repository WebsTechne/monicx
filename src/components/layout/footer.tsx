import Link from "next/link";
import { Copyright, MonitorIcon } from "lucide-react";
import { FooterYear, FooterImage, FooterThemeToggle } from "./footer-client";

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
        name: "Shop by Categories",
        href: "/shop/categories",
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
  return (
    <footer className="bg-sidebar p-6 md:px-20">
      <section className="flex flex-col items-center gap-8 pb-2.5 md:flex-row md:items-start md:justify-between md:gap-0">
        <div className="flex flex-col items-center gap-2 md:items-start md:gap-4">
          <Link href="/" className="flex w-max items-center gap-1">
            <span className="aspect-1 relative h-8 rounded-md md:h-10">
              <FooterImage />
            </span>
            <p className="text-md m-0! hidden font-medium tracking-wider md:block">
              Monicx
            </p>
          </Link>
        </div>

        <nav aria-label="Footer links" className="contents">
          {LINKS.map((linkGroup) => (
            <ul
              key={linkGroup.name}
              className="text-muted-foreground flex flex-col items-center gap-2 md:items-start md:gap-2.75"
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
      </section>

      <section className="flex items-center justify-between border-t pt-2.5">
        <div className="flex items-center gap-1">
          <p className="text-muted-foreground m-0! flex items-center text-sm">
            <Copyright className="size-(--text-sm)" aria-hidden="true" />
            <FooterYear />
          </p>
          <p className="text-muted-foreground xs:inline-block m-0! hidden text-sm">
            All rights preserved.
          </p>
        </div>

        <FooterThemeToggle />
      </section>
    </footer>
  );
}
