import { ComponentType, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile-custom";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../../ui/button";
import ShopSubmenu from "./shop-submenu";
import CollectionsSubmenu from "./collections-submenu";
import HelpSubmenu from "./help-submenu";
import { useSidebar } from "@/components/providers/sidebar-provider";
import NavLink from "@/components/elements/nav-link";
import { AppData } from "../header";

const NAV_BREAKPOINT = 1100;

type NavItemBase = {
  label: string;
  href: string;
  exclude?: string | string[];
};

type NavItemNoSub = NavItemBase & {
  hasSub: false;
  Submenu?: never;
  getData?: never;
};

type NavItemSubStatic = NavItemBase & {
  hasSub: true;
  Submenu: ComponentType<{ className: string }>;
  getData?: never;
};

type NavItemSubWithData<T> = NavItemBase & {
  hasSub: true;
  Submenu: ComponentType<{ className: string; data: T }>;
  getData: (appData: AppData) => T;
};

type NavItem = NavItemNoSub | NavItemSubStatic | NavItemSubWithData<any>;

const navItems: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    hasSub: true,
    exclude: "/shop/collections",
    Submenu: ShopSubmenu,
    getData: (appData) => appData.categories,
  },
  {
    label: "Collections",
    href: "/shop/collections",
    hasSub: true,
    Submenu: CollectionsSubmenu,
    getData: (appData) => appData.collections,
  },
  {
    label: "About",
    href: "/about",
    hasSub: false,
  },
  {
    label: "Help",
    href: "/help-center",
    hasSub: true,
    Submenu: HelpSubmenu,
  },
];

export default function Navbar({
  className,
  appData,
}: {
  className?: string;
  appData: AppData;
}) {
  const isBelowNavBreakpoint = useIsMobile(NAV_BREAKPOINT);

  const [subOpen, setSubOpen] = useState<boolean[]>(() =>
    Array(navItems.length).fill(false),
  );

  function toggleSingle(index: number) {
    setSubOpen((prev) => prev.map((_, i) => (i === index ? !prev[i] : false)));
  }

  const { toggleSidebar, openMobile, setOpenMobile } = useSidebar();

  return (
    <nav
      className={cn(
        "transition-[opacity] duration-450",
        "nav:inline-block nav:overflow-visible! nav:relative nav:opacity-100 nav:pointer-events-auto! nav:top-0 nav:h-auto nav:bg-transparent! nav:w-max",
        "absolute top-full left-0 z-100 flex h-[calc(100dvh_-_100%)] w-full flex-col-reverse overflow-clip",
        openMobile
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        className,
      )}
      aria-label="Main navigation"
    >
      <div
        className={cn("nav:hidden overlay flex-1")}
        onClick={toggleSidebar}
      ></div>
      <ul
        className={cn(
          "nav:bg-transparent! nav:backdrop-blur-none! nav:h-max nav:border-none! nav:w-max nav:flex-row nav:items-center nav:px-2 nav:gap-4.5 nav:py-0! nav:overflow-visible!",
          "header-bg scrollbar-width-none flex max-h-[calc(100dvh_-_64px)] w-full shrink-0 flex-col gap-2.25 overflow-auto border-t-1 px-5 py-2 transition-[height] duration-300",
          openMobile ? "h-max" : "h-0",
        )}
        role="menubar"
      >
        {navItems.map((item, i) => {
          // keep a generic Submenu reference (used for narrowing below)
          const Submenu = item.Submenu as ComponentType<any> | undefined;

          // build the submenu element ahead of time (no statements inside JSX)
          let submenuElement: React.ReactNode = null;

          if (item.hasSub && Submenu) {
            if ("getData" in item && typeof item.getData === "function") {
              // submenu that expects data
              const SubWithData = Submenu as ComponentType<{
                className: string;
                data: any;
              }>;
              submenuElement = (
                <SubWithData
                  className={cn(
                    "nav:border-none! nav:w-max nav:min-w-sm nav:max-w-150 min-h-11 w-full border-b-1 pb-2",
                    subOpen[i] &&
                      "slide-in-from-top-[150%] [animate-duration]-500 fade-in",
                  )}
                  data={item.getData(appData)}
                />
              );
            } else {
              // submenu that does not expect data
              const SubNoData = Submenu as ComponentType<{ className: string }>;
              submenuElement = (
                <SubNoData
                  className={cn(
                    "nav:border-none! nav:w-max nav:min-w-sm nav:max-w-150 min-h-11 w-full border-b-1 pb-2",
                    subOpen[i] &&
                      "slide-in-from-top-[150%] [animate-duration]-500 fade-in",
                  )}
                />
              );
            }
          }

          return (
            <li
              key={item.href}
              className={cn(
                "group nav:py-1 nav:inline-block nav:border-none! hover:text-foreground text-muted-foreground relative flex h-max flex-col",
                subOpen[i] && "open",
              )}
            >
              <div className="nav-link-row flex items-center justify-between">
                <Button variant="link" className="p-0" asChild>
                  <NavLink
                    href={item.href}
                    exclude={item.exclude}
                    className={cn(
                      "text-muted-foreground! not-[.active]:hover:text-foreground! nav:p-0! nav:h-auto nav:w-auto nav:text-lg flex w-max flex-row items-center gap-1 py-1.5 text-[22px] duration-250",
                      subOpen[i] && "text-foreground!",
                    )}
                    onClick={() => setOpenMobile(false)}
                    role="menuitem"
                  >
                    {item.label}
                  </NavLink>
                </Button>

                {item.hasSub &&
                  (isBelowNavBreakpoint ? (
                    <Button
                      variant="ghost"
                      type="button"
                      aria-expanded={subOpen[i]}
                      aria-controls={`submenu-${i}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSingle(i);
                      }}
                      className="flex-center flex size-8 rounded-full text-inherit duration-270"
                      title={subOpen[i] ? "Close submenu" : "Open submenu"}
                    >
                      <ChevronDownIcon
                        strokeWidth={1.5}
                        className={cn(
                          "size-4 text-inherit transition-transform",
                          subOpen[i] && "text-foreground! rotate-180",
                        )}
                      />
                    </Button>
                  ) : (
                    <ChevronDownIcon
                      strokeWidth={1.5}
                      className="size-4 text-inherit transition-transform"
                    />
                  ))}
              </div>

              {item.hasSub && Submenu && (
                <div
                  className={cn(
                    subOpen[i] ? "h-max pt-2.5" : "h-0 p-0",
                    "nav:cubic-transition not-nav:duration-300 nav:overflow-visible overflow-clip",
                    "nav:min-h-11 nav:h-auto! nav:left-1/2 nav:-translate-x-1/2 nav:-translate-y-6 nav:group-hover:opacity-100 nav:group-hover:pointer-events-auto nav:absolute nav:top-full",
                    "nav:opacity-0 nav:pointer-events-none nav:w-max nav:group-hover:translate-y-0",
                  )}
                >
                  <div
                    id={`submenu-${i}`}
                    aria-hidden={!subOpen[i]}
                    className={cn(
                      "nav:bg-background nav:dark:border-1! h-max! w-full overflow-clip",
                      "nav:rounded-xl nav:shadow-xl nav:w-max! dark:shadow-none!",
                      "nav:p-2",
                    )}
                  >
                    {submenuElement}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
