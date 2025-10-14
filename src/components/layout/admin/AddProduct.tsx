// app/components/AddProduct.tsx  (or wherever you keep it)
"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slugify } from "@/lib/utils";
import {
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, RefreshCcw } from "lucide-react";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import UploadImageInput from "@/components/elements/upload-image-input";

import { useCategoriesData, useCollectionsData } from "@/context/providers";

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

/** helper: build a Zod union of literals for runtime values */
function buildLiteralUnion(values: string[]) {
    if (values.length === 0) {
        return z.string();
    }
    if (values.length === 1) {
        return z.literal(values[0]);
    }
    const literals = values.map((v) => z.literal(v));
    // Type assertion to appease TS about minimum tuple length for z.union
    return z.union(
        literals as [
            z.ZodLiteral<string>,
            z.ZodLiteral<string>,
            ...z.ZodLiteral<string>[],
        ],
    );
}

export default function AddProduct() {
    // NOTE: provider must supply categories and collections as objects with slug/name or as strings
    const {
        data: categories,
        refresh: refreshCategories,
        isRefreshing: isRefreshingCategories,
    } = useCategoriesData();
    const {
        data: collections,
        refresh: refreshCollections,
        isRefreshing: isRefreshingCollections,
    } = useCollectionsData();

    // If categories not loaded yet, show a friendly fallback
    if (!categories || categories.length === 0) {
        return (
            <div>
                <p>No categories yet.</p>
                <button
                    onClick={refreshCategories}
                    disabled={isRefreshingCategories}
                >
                    {isRefreshingCategories
                        ? "Refreshing…"
                        : "Refresh categories"}
                </button>
            </div>
        );
    }

    // Build arrays of slugs (or fallback names/ids) and a lookup for display names
    const categorySlugs = useMemo(() => {
        return (categories ?? []).map((c: any) =>
            typeof c === "string" ? c : (c.slug ?? c.name ?? String(c.id)),
        );
    }, [categories]);

    const categoryDisplayMap = useMemo(() => {
        const map: Record<string, string> = {};
        (categories ?? []).forEach((c: any) => {
            const key =
                typeof c === "string" ? c : (c.slug ?? c.name ?? String(c.id));
            map[key] = typeof c === "string" ? c : (c.name ?? key);
        });
        return map;
    }, [categories]);

    const collectionSlugs = useMemo(() => {
        return (collections ?? []).map((c: any) =>
            typeof c === "string" ? c : (c.slug ?? c.name ?? String(c.id)),
        );
    }, [collections]);

    const collectionDisplayMap = useMemo(() => {
        const map: Record<string, string> = {};
        (collections ?? []).forEach((c: any) => {
            const key =
                typeof c === "string" ? c : (c.slug ?? c.name ?? String(c.id));
            map[key] = typeof c === "string" ? c : (c.name ?? key);
        });
        return map;
    }, [collections]);
    // Build runtime schema using current category/collection option values
    const formSchema = useMemo(() => {
        const categoryItemSchema = buildLiteralUnion(categorySlugs);
        const collectionSchema =
            collectionSlugs.length > 0
                ? buildLiteralUnion(collectionSlugs).optional()
                : z.string().optional();

        return z.object({
            name: z.string().min(1, { message: "Product Name is required!" }),
            slug: z
                .string()
                .min(1, { message: "Slug is required" })
                .regex(
                    slugRegex,
                    "Slug may contain only lowercase letters, numbers and single hyphens",
                ),
            shortDescription: z
                .string()
                .min(1, { message: "Short description is required!" })
                .max(60),
            description: z
                .string()
                .min(1, { message: "Description is required!" }),
            price: z.preprocess(
                (v) => {
                    if (typeof v === "string")
                        return v === "" ? NaN : Number(v);
                    return v;
                },
                z.number().min(1, { message: "Price must be at least 1" }),
            ),
            category: z
                .array(categoryItemSchema)
                .min(1, { message: "Select at least one category" }),
            collection: collectionSchema,
            sizes: z.array(z.enum(sizes)).optional(),
            colors: z
                .array(z.enum(colors))
                .min(1, { message: "Select at least one color" }),
            images: z.record(z.string(), z.string()).optional(),
        });
    }, [categorySlugs, collectionSlugs]);

    type FormValues = z.infer<typeof formSchema>;

    const router = useRouter();

    const form = useForm<FormValues>({
        // cast to any to avoid TS resolver type friction in some projects
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: "",
            slug: "",
            shortDescription: "",
            description: "",
            price: undefined as unknown as number,
            category: [],
            collection: undefined,
            sizes: [],
            colors: [],
            images: {},
        } as Partial<FormValues>,
    });

    const generateSlug = useCallback(() => {
        const name = form.getValues("name") || "";
        const newSlug = Slugify(name);
        form.setValue("slug", newSlug, { shouldValidate: true });
    }, [form]);

    const onSubmit = async (values: FormValues) => {
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                await res.json();
                toast.success("Product created.");
                form.reset();
                router.refresh();
            } else if (res.status === 409) {
                const body = await res.json();
                toast.error(body?.error ?? "Slug already exists");
            } else if (res.status === 422) {
                const body = await res.json();
                toast.error("Validation error. Check your inputs.");
                console.log("validation issues", body);
            } else {
                const body = await res.json().catch(() => null);
                toast.error(body?.error ?? "Failed to add product");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error");
        }
    };

    return (
        <SheetContent>
            <ScrollArea className="h-screen">
                <SheetHeader>
                    <SheetTitle className="mb-4">Add Product</SheetTitle>
                </SheetHeader>

                <Form {...form}>
                    <form
                        id="addProductForm"
                        className="space-y-8 px-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Name of Product"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the Product name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* slug */}
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <ButtonGroup className="w-full">
                                            <Input
                                                {...field}
                                                placeholder="name-of-collection"
                                            />
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        aria-label="Generate Slug"
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            generateSlug();
                                                        }}
                                                    >
                                                        <RefreshCcw />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Auto-generate slug from name
                                                </TooltipContent>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </FormControl>
                                    <FormDescription>
                                        Enter the Collection slug.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* shortDescription */}
                        <FormField
                            control={form.control}
                            name="shortDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="A short description..."
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a short description of the
                                        product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="A long and detailed description..."
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a description of the product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (₦)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            step="0.01"
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value === ""
                                                        ? undefined
                                                        : Number(
                                                              e.target.value,
                                                          ),
                                                )
                                            }
                                            placeholder="0.00"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the product's price.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* category */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <MultiSelect
                                        onValuesChange={field.onChange}
                                        values={field.value || []}
                                    >
                                        <FormControl>
                                            <MultiSelectTrigger className="w-full">
                                                <MultiSelectValue
                                                    placeholder="Select categories..."
                                                    overflowBehavior="cutoff"
                                                />
                                            </MultiSelectTrigger>
                                        </FormControl>
                                        <MultiSelectContent
                                            search={false}
                                            className="h-max!"
                                        >
                                            <MultiSelectGroup className="h-max!">
                                                {categorySlugs.map((slug) => (
                                                    <MultiSelectItem
                                                        key={slug}
                                                        value={slug}
                                                    >
                                                        {categoryDisplayMap[
                                                            slug
                                                        ] ?? slug}
                                                    </MultiSelectItem>
                                                ))}
                                            </MultiSelectGroup>
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    <FormDescription>
                                        Select categories the product falls
                                        under.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* collection */}
                        <FormField
                            control={form.control}
                            name="collection"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Collection</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={
                                                field.value as
                                                    | string
                                                    | undefined
                                            }
                                            onValueChange={(v) =>
                                                field.onChange(v || undefined)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a collection" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem
                                                    value={undefined as any}
                                                >
                                                    None
                                                </SelectItem>
                                                {collectionSlugs.map((slug) => (
                                                    <SelectItem
                                                        key={slug}
                                                        value={slug}
                                                    >
                                                        {collectionDisplayMap[
                                                            slug
                                                        ] ?? slug}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Select a collection the product belongs
                                        to.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* sizes */}
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sizes</FormLabel>
                                    <FormControl>
                                        <div className="my-1.5 grid grid-cols-3 gap-3">
                                            {sizes.map((s) => {
                                                const checked = (
                                                    field.value || []
                                                ).includes(s);
                                                return (
                                                    <div
                                                        className="group flex items-center gap-1.5"
                                                        key={s}
                                                    >
                                                        <Checkbox
                                                            id={s}
                                                            checked={checked}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                const current =
                                                                    field.value ||
                                                                    [];
                                                                if (checked)
                                                                    field.onChange(
                                                                        [
                                                                            ...current,
                                                                            s,
                                                                        ],
                                                                    );
                                                                else
                                                                    field.onChange(
                                                                        current.filter(
                                                                            (
                                                                                v,
                                                                            ) =>
                                                                                v !==
                                                                                s,
                                                                        ),
                                                                    );
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={s}
                                                            className="text-muted-foreground"
                                                        >
                                                            {s.toUpperCase()}
                                                        </label>
                                                    </div>
                                                );
                                            })}
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

                        {/* colors + image uploads */}
                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Colors</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            <div className="my-1.5 grid grid-cols-3 gap-3">
                                                {colors.map((c) => {
                                                    const checked = (
                                                        field.value || []
                                                    ).includes(c);
                                                    return (
                                                        <div
                                                            className="group flex items-center gap-1.5"
                                                            key={c}
                                                        >
                                                            <Checkbox
                                                                id={c}
                                                                checked={
                                                                    checked
                                                                }
                                                                onCheckedChange={(
                                                                    checked,
                                                                ) => {
                                                                    const current =
                                                                        field.value ||
                                                                        [];
                                                                    if (checked)
                                                                        field.onChange(
                                                                            [
                                                                                ...current,
                                                                                c,
                                                                            ],
                                                                        );
                                                                    else {
                                                                        field.onChange(
                                                                            current.filter(
                                                                                (
                                                                                    v,
                                                                                ) =>
                                                                                    v !==
                                                                                    c,
                                                                            ),
                                                                        );
                                                                        const curImages =
                                                                            form.getValues(
                                                                                "images",
                                                                            ) ||
                                                                            {};
                                                                        if (
                                                                            curImages[
                                                                                c
                                                                            ]
                                                                        ) {
                                                                            const copy =
                                                                                {
                                                                                    ...curImages,
                                                                                };
                                                                            delete copy[
                                                                                c
                                                                            ];
                                                                            form.setValue(
                                                                                "images",
                                                                                copy,
                                                                                {
                                                                                    shouldValidate: true,
                                                                                },
                                                                            );
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={c}
                                                                className="text-muted-foreground flex items-center gap-1"
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
                                                    );
                                                })}
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
                                                                    <UploadImageInput
                                                                        className="w-full"
                                                                        fieldName={`images.${col}`}
                                                                        folder="monicx/products"
                                                                    />
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Select the available colors of the
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
