"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const sortOptions = [
        { value: "newest", name: "Newest" },
        { value: "oldest", name: "Oldest" },
        { value: "asc", name: "Price: Low to High" },
        { value: "desc", name: "Price: High to Low" },
    ];

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="my-2 flex w-full items-center justify-end gap-1">
            <span className="text-muted-foreground text-sm">Sort by:</span>
            <Select
                name="size"
                defaultValue={sortOptions[0].value}
                onValueChange={(val) => handleFilter(val)}
            >
                <SelectTrigger className="w-43" size="sm">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((op) => (
                        <SelectItem value={op.value} key={op.value}>
                            {op.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
