"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slugify } from "@/lib/utils";
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
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { Plus, RefreshCcw, UploadCloud } from "lucide-react";
import CloudinaryDirectUploader from "./upload-image";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    slug: z
        .string()
        .min(1, { message: "Slug is required!" })
        .regex(
            slugRegex,
            "Slug may contain only lowercase letters, numbers and single hyphens",
        ),
    imagePath: z.string().min(1, { message: "Category image is required!" }),
    description: z.string().min(1, { message: "Description is required!" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddCategory() {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            imagePath: "",
            description: "",
        },
    });

    // generate slug from current name in the form
    const generateSlug = useCallback(() => {
        const name = form.getValues("name") || "";
        const newSlug = Slugify(name);
        form.setValue("slug", newSlug, { shouldValidate: true });
    }, [form]);

    const onSubmit = async (values: FormValues) => {
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                await res.json();
                toast.success("Category created.");
                form.reset(); // clear form
                router.refresh(); // refresh page
            } else if (res.status === 409) {
                const body = await res.json();
                toast.error(body?.error ?? "Slug already exists");
            } else if (res.status === 422) {
                const body = await res.json();
                toast.error("Validation error. Check your inputs.");
                console.log("validation issues", body);
            } else {
                const body = await res.json().catch(() => null);
                toast.error(body?.error ?? "Failed to create category");
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
                    <SheetTitle className="mb-4">Add Category</SheetTitle>
                    <SheetDescription asChild></SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        id="addCategoryForm"
                        className="space-y-8 px-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Name of Category"
                                        />
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
                                        <ButtonGroup className="w-full">
                                            <Input
                                                {...field}
                                                placeholder="name-of-category"
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
                                        Enter the Category slug.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imagePath"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <ButtonGroup className="w-full">
                                            <Input
                                                {...field}
                                                placeholder="Image URL or upload"
                                            />
                                            <Dialog>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                aria-label="Upload Image"
                                                                type="button"
                                                            >
                                                                <UploadCloud />
                                                            </Button>
                                                        </DialogTrigger>
                                                    </TooltipTrigger>

                                                    <TooltipContent>
                                                        Upload an image
                                                    </TooltipContent>
                                                </Tooltip>

                                                <DialogContent className="max-h-[75dvh] overflow-x-hidden overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Upload an Image
                                                        </DialogTitle>
                                                    </DialogHeader>

                                                    <CloudinaryDirectUploader
                                                        className="rounded-md"
                                                        fieldName="imagePath"
                                                        folder="monicx/categories"
                                                    />

                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button size="sm">
                                                                Done
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </ButtonGroup>
                                    </FormControl>
                                    <FormDescription>
                                        Enter the path to the image.
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
                                        <Textarea
                                            {...field}
                                            placeholder="Description of Category"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a description for the Category.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <SheetFooter>
                    <Button
                        type="submit"
                        form="addCategoryForm"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        <Plus /> Add Category
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </ScrollArea>
        </SheetContent>
    );
}
