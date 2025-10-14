import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Slugify(input: string): string {
    const slug = slugify(input, { lower: true, strict: true });
    return slug;
}
