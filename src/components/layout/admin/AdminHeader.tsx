"use client";

import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import getInitials from "@/lib/helpers/initials";
import { ServerSession } from "@/app/layout";
import { usePathname, useSearchParams } from "next/navigation";
import { handleSignOut } from "@/components/elements/account-button";

export function AdminHeader({ session }: { session: ServerSession }) {
  const { setTheme } = useTheme();
  const user = session?.user;

  if (!user) return null;

  const { firstName, lastName, image, role } = user;
  const { initials } = getInitials(`${firstName ?? "x"} ${lastName ?? "x"}`);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnTo =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  return (
    <nav className="bg-background sticky top-0 z-10 flex items-center justify-between p-4">
      {/* LEFT */}
      <SidebarTrigger />

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Link href="/admin">Admin Dashboard</Link>

        {/* THEME MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="ring-ring/50 duration-300 hover:ring-[5px]">
              <AvatarImage
                src={image || ""}
                alt={`${firstName} ${lastName}`}
              ></AvatarImage>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={10}
            align="center"
            className="mr-3 min-w-40"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-[1.2rem] w-[1.2rem]" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-[1.2rem] w-[1.2rem]" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut
                className="mr-2 h-[1.2rem] w-[1.2rem]"
                onClick={() => handleSignOut(returnTo)}
              />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
