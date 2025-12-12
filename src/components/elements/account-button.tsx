import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { logOut } from "@/lib/auth";
import getInitials from "@/lib/initials";

export default function AccountButton({
  session,
}: {
  session: Session | null;
}) {
  if (!session?.user) return null;

  const { theme = "system", setTheme } = useTheme();

  const { firstName, lastName, initials } = getInitials(session.user.name!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ring-ring/50 size-8 duration-300 hover:ring-[5px]">
          <AvatarImage
            src={session.user?.image || ""}
            alt={`${firstName} ${lastName}`}
          ></AvatarImage>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-100! mr-5 min-w-40">
        <DropdownMenuGroup className="text-muted-foreground flex flex-row! items-center justify-between gap-2 p-1 text-sm">
          Change Theme
          <span className="flex items-center rounded-full bg-black/7 p-0.5 dark:bg-black/25">
            <DropdownMenuItem
              className={cn(
                theme === "light" && "bg-muted!",
                "grid size-6.5! place-items-center rounded-full p-0!",
              )}
              onClick={() => setTheme("light")}
            >
              <Sun className="size-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                theme === "dark" && "bg-muted!",
                "grid size-6.5! place-items-center rounded-full p-0!",
              )}
              onClick={() => setTheme("dark")}
            >
              <Moon className="size-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                theme === "system" && "bg-muted!",
                "grid size-6.5! place-items-center rounded-full p-0!",
              )}
              onClick={() => setTheme("system")}
            >
              <Monitor className="size-4" />
            </DropdownMenuItem>
          </span>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={logOut}>
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
