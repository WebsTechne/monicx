import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUserRoundIcon,
  HeartIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  UserRoundIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import getInitials from "@/lib/helpers/initials";
import Link from "next/link";
import type { ServerSession } from "@/app/layout";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signOutAndRedirect = async ({
  returnTo,
  push,
}: {
  returnTo: string;
  push: (href: string) => void;
}) => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        push(`/auth/sign-in?returnTo=${encodeURIComponent(returnTo)}`);
      },
      onError: () => {
        toast.error("Couldn't sign-out. Please try again.");
      },
    },
  });
};

function AccountButton({
  returnTo,
  session,
}: {
  returnTo: string;
  session: ServerSession;
}) {
  const { push } = useRouter();
  const { theme = "system", setTheme } = useTheme();
  const user = session?.user;

  if (!user) return null;

  const { firstName, lastName } = user;
  const { initials } = getInitials(`${firstName ?? "x"} ${lastName ?? "x"}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="flex-center inline-flex size-9 rounded-full">
          <Avatar className="ring-accent dark:ring-accent/50 size-6.5 duration-300 hover:ring-[6px]">
            {/* ring-ring/50 */}
            <AvatarImage
              src={user?.image || ""}
              alt={`${firstName} ${lastName}`}
            ></AvatarImage>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {/* Account */}
            <Link href="/account">
              <CircleUserRoundIcon /> Account
            </Link>
          </DropdownMenuItem>
          {/* Wishlist */}
          <DropdownMenuItem asChild>
            <Link href="/wishlist">
              <HeartIcon /> Wishlist
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Theme */}
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
              <SunIcon className="size-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                theme === "dark" && "bg-muted!",
                "grid size-6.5! place-items-center rounded-full p-0!",
              )}
              onClick={() => setTheme("dark")}
            >
              <MoonIcon className="size-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                theme === "system" && "bg-muted!",
                "grid size-6.5! place-items-center rounded-full p-0!",
              )}
              onClick={() => setTheme("system")}
            >
              <MonitorIcon className="size-4" />
            </DropdownMenuItem>
          </span>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => signOutAndRedirect({ returnTo, push })}
          >
            <LogOutIcon />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AccountButton, signOutAndRedirect };
