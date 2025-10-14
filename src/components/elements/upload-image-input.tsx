"use client";

import { useFormContext, useWatch } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import CloudinaryDirectUploader from "../layout/admin/upload-image";
import { cn } from "@/lib/utils";

export default function UploadImageInput({
    className,
    placeholder = "Image URL or upload",
    fieldName,
    folder,
}: {
    className?: string;
    placeholder?: string;
    fieldName: string; // dotted path e.g. images.blue
    folder?: string;
}) {
    const { setValue } = useFormContext();
    const value = useWatch({ name: fieldName }) as string | undefined;
    const inputValue = value ?? "";

    const onUploaded = (result: any) => {
        const secureUrl = result?.secure_url || result?.url;
        if (secureUrl) {
            setValue(fieldName, secureUrl, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    };

    return (
        <ButtonGroup className={cn("w-full", className)}>
            <Input
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => {
                    const v = e.target.value;
                    setValue(fieldName, v === "" ? undefined : v, {
                        shouldDirty: true,
                        shouldValidate: true,
                    });
                }}
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
                    <TooltipContent>Upload an image</TooltipContent>
                </Tooltip>

                <DialogContent className="max-h-[75dvh] overflow-x-hidden overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Upload an Image</DialogTitle>
                    </DialogHeader>
                    <CloudinaryDirectUploader
                        className="rounded-md"
                        fieldName={fieldName}
                        folder={folder}
                        onUploaded={onUploaded}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button size="sm">Done</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ButtonGroup>
    );
}
