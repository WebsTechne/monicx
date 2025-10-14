// ALL CSS STYLES FROM Shadcn/ui Slider COMPONENT

"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export default function Slider({
    className,
    defaultValue = [25, 75],
    value,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            className={cn(
                "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                    "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
                )}
            >
                <SliderPrimitive.Range data-slot="slider-range" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb />
            <SliderPrimitive.Thumb />
        </SliderPrimitive.Root>
    );
}

// INCOMPLETE...
