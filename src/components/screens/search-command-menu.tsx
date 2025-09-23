"use client";

import { useState, useEffect } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";

export default function SearchCommandMenu() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <CommandDialog
            open={open}
            onOpenChange={setOpen}
            className="rounded-xl!"
        >
            <CommandInput placeholder="Search for clothes..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions" className="pb-2">
                    <CommandItem className="rounded-lg">Calendar</CommandItem>
                    <CommandItem className="rounded-lg">
                        Search Emoji
                    </CommandItem>
                    <CommandItem className="rounded-lg">Calculator</CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
