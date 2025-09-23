"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cart-store";
import { ProductType } from "@/types";
import { cn } from "@/lib/utils";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductInteraction({
    product,
    selectedSize,
    selectedColor,
}: {
    product: ProductType;
    selectedSize: string;
    selectedColor: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleTypeChange = (type: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCartStore();

    const handleQuantity = {
        minus: () => {
            if (quantity <= 1) return;
            setQuantity((q) => (q -= 1));
        },
        plus: () => {
            setQuantity((q) => (q += 1));
        },
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity,
            selectedSize,
            selectedColor,
        });
        toast.success("Product added to cart.");
    };

    return (
        <div className="flex flex-col gap-4">
            {/* SIZE */}
            <div className="flex flex-col gap-1 text-xs">
                <span className="text-muted-foreground">Size(s)</span>
                <div className="flex items-center gap-1 md:gap-2">
                    {product.sizes.map((size) => (
                        <button
                            className={cn(
                                "rounded-md border-2 p-0.5",
                                selectedSize === size
                                    ? "border-foreground/80"
                                    : "border-muted-foreground/50",
                            )}
                            key={size}
                            onClick={() => handleTypeChange("size", size)}
                        >
                            <span
                                className={cn(
                                    "grid size-6! place-items-center rounded-[calc(var(--radius-md)-3px)] leading-tight font-extrabold",
                                    selectedSize === size
                                        ? "bg-foreground/80 text-background"
                                        : "bg-muted-foreground/50 text-muted",
                                )}
                            >
                                {size.toUpperCase()}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            {/* COLOR */}
            <div className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">Color(s)</span>
                <div className="flex items-center gap-1 md:gap-2">
                    {product.colors.map((color) => (
                        <button
                            className="grid size-6! cursor-pointer place-items-center rounded-md border-2 p-0.5"
                            style={{
                                borderColor: color,
                                backgroundColor: color,
                            }}
                            key={color}
                            onClick={() => handleTypeChange("color", color)}
                        >
                            {selectedColor === color && (
                                <Check
                                    className="text-foreground size-4"
                                    strokeWidth={3}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
            {/* QUANTITY */}
            <div className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-4">
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-7.5!"
                        onClick={() => handleQuantity.minus()}
                    >
                        <Minus />
                    </Button>
                    <span className="">{quantity}</span>
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-7.5!"
                        onClick={() => handleQuantity.plus()}
                    >
                        <Plus />
                    </Button>
                </div>
            </div>

            {/* BUTTONS */}
            <Button
                className="mx-auto mb-2 w-full active:scale-x-95 active:scale-y-100!"
                onClick={handleAddToCart}
            >
                <Plus /> Add to Cart
            </Button>
            <Button
                variant="secondary"
                className="mx-auto w-full active:scale-x-95 active:scale-y-100!"
            >
                <ShoppingBag /> Buy now
            </Button>
        </div>
    );
}
