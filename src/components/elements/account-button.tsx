import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Monitor, Moon, Sun, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import getInitials from "@/lib/helpers/initials";
import Link from "next/link";
import { AuthSession } from "@/app/layout";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AccountButton({
  returnTo,
  session,
}: {
  returnTo: string;
  session: AuthSession;
}) {
  const { push } = useRouter();
  const { theme = "system", setTheme } = useTheme();
  const user = session?.user;

  if (!user) return null;

  const { firstName, lastName } = user;
  const { initials } = getInitials(`${firstName ?? "x"} ${lastName ?? "x"}`);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          push(`/auth/sign-in?returnTo=${returnTo}`);
        },
        onError: () => {
          toast.error("Couldn't sign-out. Please try again.", {});
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ring-ring/50 size-8 duration-300 hover:ring-[5px]">
          <AvatarImage
            src={user?.image || ""}
            alt={`${firstName} ${lastName}`}
          ></AvatarImage>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-100! mr-5 min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <UserRound /> Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

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
          <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
