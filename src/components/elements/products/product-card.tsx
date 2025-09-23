"use client";

import { useState } from "react";
// TYPES & STORES
import { ProductType } from "@/types";
import useCartStore from "@/stores/cart-store";
// UTILS
import { cn } from "@/lib/utils";
// NEXT ELEMENTS
import Image from "next/image";
import Link from "next/link";
// UI COMPONENTS
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProductCard({
    product,
}: {
    product: ProductType & { slug?: string };
}) {
    const [productTypes, setProductTypes] = useState({
        size: product.sizes[0],
        color: product.colors[0],
    });

    const { addToCart } = useCartStore();

    const handleProductType = ({
        type,
        value,
    }: {
        type: "size" | "color";
        value: string;
    }) => {
        setProductTypes((prev) => ({ ...prev, [type]: value }));
    };

    const productUrl = `/shop/product/${product.slug ?? product.id}`;

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: 1,
            selectedSize: productTypes.size,
            selectedColor: productTypes.color,
        });
        toast.success("Product added to cart", {
            description: "You can view your cart items in the cart page.",
        });
    };

    return (
        <div className="overflow-clip rounded-[16px] border p-1 shadow-none!">
            {/* IMAGE */}
            <Link href={productUrl}>
                <div className="relative aspect-4/5 overflow-clip rounded-[calc(16px-4px)]">
                    <Image
                        src={product.images[productTypes.color] as string}
                        alt={product.name}
                        fill
                        className="object-cover duration-300 hover:scale-105"
                    />
                </div>
            </Link>

            {/* PRODUCT DETAIL */}
            <div className="flex flex-col gap-1.5 p-1.5">
                <p className="m-0! line-clamp-1 text-left text-lg font-medium">
                    {product.name}
                </p>
                <p className="text-muted-foreground m-0! line-clamp-2 text-sm leading-normal">
                    {product.shortDescription}
                </p>

                {/* PRODUCT TYPES */}
                <div className="flex items-center gap-2 text-xs">
                    {/* SIZES */}
                    <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">Size</span>
                        <Select
                            name="size"
                            defaultValue={product.sizes[0]}
                            onValueChange={(value) =>
                                handleProductType({ type: "size", value })
                            }
                        >
                            <SelectTrigger className="w-20!">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {product.sizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* COLORS */}
                    <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">Color</span>
                        <div className="flex items-center gap-1">
                            {product.colors.map((color) => (
                                <div
                                    className={cn(
                                        "inline-grid size-5 place-items-center rounded-full border-(--color)! shadow-[0_0_5px_1px_rgb(from_var(--muted-foreground))_r_g_b_/_.3] transition-[border-width,_padding]",
                                        `cursor-pointer ${productTypes.color === color ? "border-4 p-0.5" : "border-0"}`,
                                    )}
                                    style={
                                        {
                                            "--color": color,
                                        } as React.CSSProperties
                                    }
                                    key={color}
                                    onClick={() =>
                                        handleProductType({
                                            type: "color",
                                            value: color,
                                        })
                                    }
                                >
                                    <span className="size-full rounded-full bg-(--color)" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PRICE / ADD TO CART */}
                <div className="flex items-center justify-between">
                    <span className="leading-relaxed font-medium">
                        ${product.price.toFixed(2)}
                    </span>
                    <Button size="sm" onClick={handleAddToCart}>
                        <ShoppingCart className="s-full text-inherit" />
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
