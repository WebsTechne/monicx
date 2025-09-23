"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";

export type Product = {
    id: string | number;
    slug?: string;
    category?: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
};

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <span className="h-12! inline-block aspect-4/5 rounded-md overflow-clip relative">
                    <Image
                        src={product.images[product.colors[0]]}
                        alt={product.slug || product.name}
                        fill
                        className="rounded-inherit object-cover"
                    />
                </span>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const product = row.original;
            return product.price.toFixed(2);
        },
    },
    { accessorKey: "shortDescription", header: "Description" },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original;

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
                                    product.id.toString()
                                );

                                toast(
                                    `Product ID: ${product.id.toString()} copied to clipboard`,
                                    {
                                        description: product.id.toString(),
                                    }
                                );
                            }}
                        >
                            Copy product ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={`/products/${product.slug || product.id}`}
                            >
                                View product details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                                toast.warning(
                                    `Do you really want to delete this product? (id: ${product.id.toString()})`,
                                    {
                                        description:
                                            "This action cannot be undone.",
                                    }
                                );
                            }}
                        >
                            <Trash2 /> Delete Product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
