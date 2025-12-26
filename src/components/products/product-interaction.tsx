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
                <div className="flex items-center gap-3 md:gap-4">
                    {product.sizes.map((size) => (
                        <button
                            className={cn(
                                "rounded-full border-2 p-0.5",
                                selectedSize === size
                                    ? "border-foreground/80"
                                    : "border-muted-foreground/50",
                            )}
                            key={size}
                            onClick={() => handleTypeChange("size", size)}
                        >
                            <span
                                className={cn(
                                    "grid size-6! place-items-center rounded-full leading-tight font-extrabold",
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
                <div className="flex items-center gap-3 md:gap-4">
                    {product.colors.map((color) => (
                        <button
                            className="grid size-6! cursor-pointer place-items-center rounded-full border-2 p-0.5"
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
            <div className="flex items-center gap-9">
                <Button
                    className="flex-1 active:scale-x-95 active:scale-y-100!"
                    onClick={handleAddToCart}
                >
                    <Plus /> Add to Cart
                </Button>
                <Button
                    variant="secondary"
                    className="flex-1 active:scale-x-95 active:scale-y-100!"
                >
                    <ShoppingBag /> Buy now
                </Button>
            </div>
        </div>
    );
}
