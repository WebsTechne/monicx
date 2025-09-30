import { User } from "@/types";
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

export default function AccountButton({ user }: { user: User }) {
    const { theme, resolvedTheme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="ring-ring/50 size-9 duration-300 hover:ring-[5px]">
                    <AvatarImage
                        src={user?.image || ""}
                        alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                    ></AvatarImage>
                    <AvatarFallback>{user?.initials}</AvatarFallback>
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
                    <DropdownMenuItem variant="destructive">
                        <LogOut />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
