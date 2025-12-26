"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { FilterIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function FilterContent() {
    const [price, setPrice] = useState<number[]>([25000, 75000]);

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
        <div className="my-2 flex w-full items-center justify-end gap-2 px-1">
            <span className="flex items-center gap-1">
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
            </span>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">
                        <FilterIcon /> Filter
                    </Button>
                </SheetTrigger>
                <SheetContent className="z-1000!">
                    <ScrollArea className="h-screen">
                        <SheetHeader>
                            <SheetTitle>Filter Products</SheetTitle>
                            <SheetDescription>
                                Filter the products with the parameters below:
                            </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-8 px-4">
                            <section>
                                <h2>Price Range</h2>
                                <p>
                                    Set your budget range ($
                                    <span className="font-medium tabular-nums">
                                        {price[0]}
                                    </span>{" "}
                                    -{" "}
                                    <span className="font-medium tabular-nums">
                                        {price[1]}
                                    </span>
                                    ).
                                </p>
                                <Slider
                                    value={price}
                                    onValueChange={setPrice}
                                    max={100000}
                                    min={10000}
                                    minStepsBetweenThumbs={10}
                                    step={500}
                                    className="mt-2 w-full"
                                    aria-label="Price Range"
                                />
                            </section>

                            <section></section>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export function Filter() {
    return (
        <Suspense fallback={<div>Loading sort…</div>}>
            <FilterContent />
        </Suspense>
    );
}
