"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export type User = {
    id: string;
    avatar: string;

    fullName: string;
    initials: string;
    email: string;
    status: "active" | "inactive";
};

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                checked={row.getIsSelected()}
            />
        ),
    },
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Avatar className="size-9">
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "fullName",
        header: "User",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");

            return (
                <div
                    className={cn(
                        `w-max rounded-md p-1 text-xs`,
                        status === "active" && "bg-green-500/40",
                        status === "inactive" && "bg-red-500/40",
                    )}
                >
                    {status as string}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="text-muted-foreground">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    user.id.toString(),
                                );

                                toast(
                                    `User ID: ${user.id.toString()} copied to clipboard`,
                                    {
                                        description: user.id.toString(),
                                    },
                                );
                            }}
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/users/${user.id}`}>
                                View customer
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
