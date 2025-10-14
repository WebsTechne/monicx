"use client";

import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

type SignResponse = {
    signature: string;
    timestamp: number;
    apiKey: string;
    cloudName: string;
    folder?: string;
    public_id?: string;
};

export type UploaderRef = {
    openFilePicker: () => void;
};

type Props = {
    fieldName?: string;
    folder?: string;
    publicIdPrefix?: string;
    className?: string;
    inputId?: string;
    onUploaded?: (result: any) => void; // optional hook for parent
};

const CloudinaryDirectUploader = forwardRef<UploaderRef, Props>(
    function CloudinaryDirectUploader(
        {
            fieldName = "imagePath",
            folder,
            publicIdPrefix,
            className,
            inputId,
            onUploaded,
        },
        ref,
    ) {
        const { setValue } = useFormContext();
        const inputRef = useRef<HTMLInputElement | null>(null);
        const localIdRef = useRef(
            inputId ??
                `cloudinary-upload-${Math.random().toString(36).slice(2, 9)}`,
        );
        const [progress, setProgress] = useState<number | null>(null);
        const [loading, setLoading] = useState(false);
        const [dragActive, setDragActive] = useState(false);
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);

        useImperativeHandle(ref, () => ({
            openFilePicker: () => inputRef.current?.click(),
        }));

        useEffect(() => {
            return () => {
                if (previewUrl) URL.revokeObjectURL(previewUrl);
            };
        }, [previewUrl]);

        async function getSignature(paramsToSign: Record<string, any> = {}) {
            const res = await fetch("/api/cloudinary/sign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paramsToSign }),
            });
            if (!res.ok) throw new Error("Failed to get signature");
            const data: SignResponse = await res.json();
            return data;
        }

        function uploadToCloudinary(file: File, sign: SignResponse) {
            return new Promise<any>((resolve, reject) => {
                const {
                    signature,
                    timestamp,
                    apiKey,
                    cloudName,
                    folder: signedFolder,
                    public_id: signedPublicId,
                } = sign;
                const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                const fd = new FormData();
                fd.append("file", file);
                fd.append("api_key", apiKey);
                fd.append("timestamp", String(timestamp));
                fd.append("signature", signature);

                if (signedFolder || folder)
                    fd.append("folder", signedFolder ?? folder!);
                if (signedPublicId || publicIdPrefix) {
                    const pid =
                        signedPublicId ??
                        `${publicIdPrefix ?? "uploads"}/${Date.now()}`;
                    fd.append("public_id", pid);
                }

                const xhr = new XMLHttpRequest();
                xhr.open("POST", url);

                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable)
                        setProgress(Math.round((e.loaded / e.total) * 100));
                };

                xhr.onload = () => {
                    setLoading(false);
                    setProgress(null);
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const resJson = JSON.parse(xhr.responseText);
                            resolve(resJson);
                        } catch (err) {
                            reject(
                                new Error("Cloudinary response parse error"),
                            );
                        }
                    } else {
                        reject(
                            new Error(
                                `Upload failed: ${xhr.statusText || xhr.status}`,
                            ),
                        );
                    }
                };

                xhr.onerror = () => {
                    setLoading(false);
                    setProgress(null);
                    reject(new Error("Network Error during upload"));
                };

                setLoading(true);
                xhr.send(fd);
            });
        }

        async function handleFile(file: File | undefined | null) {
            if (!file) return;
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file.");
                return;
            }

            // preview
            try {
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(URL.createObjectURL(file));
            } catch {
                setPreviewUrl(null);
            }

            try {
                const paramsToSign: Record<string, any> = {};
                if (folder) paramsToSign.folder = folder;
                if (publicIdPrefix)
                    paramsToSign.public_id = `${publicIdPrefix}/${Date.now()}`;

                const sign = await getSignature(paramsToSign);
                const result = await uploadToCloudinary(file, sign);

                const secureUrl = result.secure_url || result.url;
                const publicId = result.public_id;

                setValue(fieldName, secureUrl, {
                    shouldValidate: true,
                    shouldDirty: true,
                });

                toast.success("Image uploaded.");
                onUploaded?.(result);
                return result;
            } catch (err: any) {
                console.error(err);
                toast.error(err?.message || "Upload failed");
                throw err;
            } finally {
                // reset input for future uploads
                if (inputRef.current) inputRef.current.value = "";
                setLoading(false);
            }
        }

        async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
            const file = e.target.files?.[0];
            await handleFile(file).catch(() => {});
        }

        function onDragOver(e: React.DragEvent) {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
        }

        function onDragLeave(e: React.DragEvent) {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
        }

        async function onDrop(e: React.DragEvent) {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            const file = e.dataTransfer.files?.[0];
            await handleFile(file).catch(() => {});
        }

        return (
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={cn(
                    "relative flex flex-col items-center justify-center gap-3 rounded-md p-4 transition-colors",
                    "border-2 border-dashed",
                    dragActive
                        ? "border-primary/80 bg-primary/5"
                        : "border-muted",
                    className,
                )}
                aria-label="Image upload dropzone"
            >
                <input
                    ref={inputRef}
                    id={localIdRef.current}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    disabled={loading}
                    className="sr-only"
                />

                <div className="flex flex-col items-center justify-center gap-2 py-5">
                    <CloudUpload
                        strokeWidth={1.2}
                        className="text-muted-foreground size-20"
                    />
                    <div className="text-muted-foreground text-sm">
                        {dragActive
                            ? "Drop image to upload"
                            : "Drag & drop or select an image"}
                    </div>
                </div>

                {previewUrl ? (
                    <div className="mt-2 w-full max-w-xs">
                        <img
                            src={previewUrl}
                            alt="preview"
                            className="w-full rounded-md object-cover"
                        />
                    </div>
                ) : null}

                {loading ? (
                    <div className="mt-2 text-sm">
                        Uploading… {progress ? `${progress}%` : ""}
                    </div>
                ) : (
                    <div className="absolute right-2 bottom-2 flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => inputRef.current?.click()}
                        >
                            Select
                        </Button>
                    </div>
                )}
            </div>
        );
    },
);

export default CloudinaryDirectUploader;
