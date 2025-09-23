"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
    "T-shirts",
    "Shoes",
    "Accessories",
    "Bags",
    "Dresses",
    "Jackets",
    "Gloves",
] as const;

const sizes = [
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
] as const;

const colors = [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
    "black",
    "white",
] as const;

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const formSchema = z.object({
    name: z.string().min(1, { message: "Product Name is required!" }),
    shortDescription: z
        .string()
        .min(1, { message: "Short description is required!" })
        .max(60),
    description: z.string().min(1, { message: "Description is required!" }),
    price: z.number().min(1, { message: "Price is required!" }),
    category: z.enum(categories),
    sizes: z.array(z.enum(sizes)),
    colors: z.array(z.enum(colors)),
    images: z.record(z.enum(colors), z.string()),
    slug: z
        .string()
        .min(1, { message: "Slug is required" })
        .regex(
            slugRegex,
            "Slug may contain only lowercase letters, numbers and single hyphens",
        ),
});

function slugify(input = "") {
    return (
        input
            .toString()
            .toLowerCase()
            // replace invalid chars with hyphens
            .replace(/[^a-z0-9]+/g, "-")
            // remove leading/trailing hyphens
            .replace(/^-+|-+$/g, "")
            // collapse multiple hyphens
            .replace(/-+/g, "-")
    );
}

export default function AddProduct() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", slug: "" },
    });

    // keep track if user has manually edited slug
    const [isSlugEdited, setIsSlugEdited] = useState(false);

    // watch the name field and auto-set slug while user hasn't edited it
    const name = form.watch("name");
    useEffect(() => {
        if (!isSlugEdited) {
            const auto = slugify(name || "");
            form.setValue("slug", auto, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, isSlugEdited]);

    // sanitizer for slug input (enforces rules while typing)
    const sanitizeSlugInput = (val: string) => slugify(val);

    return (
        <SheetContent>
            <ScrollArea className="h-screen">
                <SheetHeader>
                    <SheetTitle className="mb-4">Add Product</SheetTitle>
                    <SheetDescription asChild></SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form id="addProductForm" className="space-y-8 px-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the Category name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            onChange={(e) => {
                                                const clean = sanitizeSlugInput(
                                                    e.target.value,
                                                );
                                                field.onChange(clean);
                                                setIsSlugEdited(true);
                                            }}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                            placeholder="auto-generated-from-name"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        URL-friendly identifier. Lowercase,
                                        letters/numbers and hyphens only.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="shortDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a short description of the
                                        product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a description of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the product&apos;s price.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category"></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((c) => (
                                                    <SelectItem
                                                        key={c}
                                                        value={c}
                                                    >
                                                        {c}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Enter the category of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sizes</FormLabel>
                                    <FormControl>
                                        <div className="my-1.5 grid grid-cols-3 gap-3">
                                            {sizes.map((s) => (
                                                <div
                                                    className="group has-[input:checked]:text-foreground! flex items-center gap-1.5"
                                                    key={s}
                                                >
                                                    <Checkbox
                                                        id={s}
                                                        checked={field.value?.includes(
                                                            s,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            const currentValues =
                                                                field.value ||
                                                                [];
                                                            if (checked)
                                                                field.onChange([
                                                                    ...currentValues,
                                                                    s,
                                                                ]);
                                                            else
                                                                field.onChange(
                                                                    currentValues.filter(
                                                                        (v) =>
                                                                            v !==
                                                                            s,
                                                                    ),
                                                                );
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={s}
                                                        className="text-muted-foreground group:[&:has(input:checked)]:text-foreground!"
                                                    >
                                                        {s.toUpperCase()}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Select the available sizes of the
                                        product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Colors</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            <div className="my-1.5 grid grid-cols-3 gap-3">
                                                {colors.map((c) => (
                                                    <div
                                                        className="group has-[input:checked]:text-foreground! flex items-center gap-1.5"
                                                        key={c}
                                                    >
                                                        <Checkbox
                                                            id={c}
                                                            checked={field.value?.includes(
                                                                c,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                const currentValues =
                                                                    field.value ||
                                                                    [];
                                                                if (checked)
                                                                    field.onChange(
                                                                        [
                                                                            ...currentValues,
                                                                            c,
                                                                        ],
                                                                    );
                                                                else
                                                                    field.onChange(
                                                                        currentValues.filter(
                                                                            (
                                                                                v,
                                                                            ) =>
                                                                                v !==
                                                                                c,
                                                                        ),
                                                                    );
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={c}
                                                            className="text-muted-foreground group:[&:has(input:checked)]:text-foreground! flex items-center gap-1"
                                                        >
                                                            <div
                                                                className="size-2 rounded-md"
                                                                style={{
                                                                    backgroundColor:
                                                                        c,
                                                                }}
                                                            />
                                                            {c}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            {field.value &&
                                                field.value.length > 0 && (
                                                    <div className="mb-2.5 space-y-2">
                                                        <p className="m-0! text-sm leading-normal font-medium">
                                                            Upload images for
                                                            the selected colors:
                                                        </p>
                                                        {field.value.map(
                                                            (col) => (
                                                                <div
                                                                    className="grid grid-cols-[70px_1fr] gap-3"
                                                                    key={col}
                                                                >
                                                                    <div className="flex items-center gap-1">
                                                                        <div
                                                                            className="size-2 rounded-md"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    col,
                                                                            }}
                                                                        />
                                                                        <span className="text-sm">
                                                                            {
                                                                                col
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <Input
                                                                        id="picture"
                                                                        type="file"
                                                                        accept="image/*"
                                                                    />
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Select the available sizes of the
                                        product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <SheetFooter>
                    <Button type="submit" form="addProductForm">
                        <Plus /> Add Product
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </ScrollArea>
        </SheetContent>
    );
}
