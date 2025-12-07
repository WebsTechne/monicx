"use client";

import { CSSProperties, useState } from "react";
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
import { Heart, MoreVertical, ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile-custom";

export default function ProductCard({
  product,
  wishlistPage,
}: {
  product: ProductType & { slug?: string };
  wishlistPage?: boolean;
}) {
  const isMobile = useIsMobile(768);

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

  const productUrl = `/shop/${product.slug ?? product.id}`;

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
    <div className="overflow-clip rounded-[1.5rem] border p-1 shadow-none!">
      {/* IMAGE */}
      <Link href={productUrl}>
        <div className="relative aspect-4/5 overflow-clip rounded-[calc(1.5rem-4px)]">
          <Image
            src={product.images[productTypes.color] as string}
            alt={product.name}
            fill
            className="object-cover duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* PRODUCT DETAIL */}
      <div className="flex flex-col p-1.5">
        <p className="line-clamp-1 text-left font-medium">{product.name}</p>

        <div className="flex items-center gap-1">
          <span
            className="rating inline-block aspect-5/1 h-4"
            style={
              {
                "--rating": product.rating.value.toFixed(1),
              } as CSSProperties
            }
            data-rating={product.rating.value.toFixed(1)}
          ></span>
          <span className="text-muted-foreground text-sm leading-tight">
            {product.rating.value.toFixed(1)} ({product.rating.votes})
          </span>
        </div>

        <div className="text-muted-foreground flex items-center">
          <span className="text-foreground inline-block flex-1 text-lg font-extrabold">
            ${product.price}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="size-7! rounded-full transition-all!"
            onClick={() => {
              if (wishlistPage) {
                toast.warning(
                  "Do you really want to remove this item from wishlist?",
                  {
                    action: {
                      label: "Remove",
                      onClick: () => {
                        // Handle wishlist removal logic here
                      },
                    },
                  },
                );
              }
            }}
          >
            <Heart
              size={20}
              className={wishlistPage || product.wishlist ? "stroke-gold" : ""}
              fill={
                wishlistPage || product.wishlist
                  ? "var(--color-gold)"
                  : "transparent"
              }
            />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="btn size-7! rounded-full transition-all!"
              >
                <MoreVertical size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "top" : "right"}
              align={isMobile ? "center" : "end"}
              className="z-100! mr-2 rounded-xl! shadow-xl"
            >
              <p className="flex items-center justify-between text-sm font-bold">
                {product.name}
                <span className="text-gold font-extrabold">
                  $<span className="text-base">{product.price.toFixed(2)}</span>
                </span>
              </p>

              <p className="text-muted-foreground mb-1.75 line-clamp-2 text-sm leading-normal">
                {product.shortDescription}
              </p>

              {/* PRODUCT SPECS */}
              <div className="mb-1.75 flex items-center justify-between gap-2 text-xs">
                {/* SIZES */}
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Size</span>
                  <Select
                    name="size"
                    defaultValue={product.sizes[0]}
                    onValueChange={(value) =>
                      handleProductType({
                        type: "size",
                        value,
                      })
                    }
                  >
                    <SelectTrigger className="w-20! px-2! py-1!" size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-100! mt-0">
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
                  <span className="text-muted-foreground">Color(s)</span>
                  <div className="flex items-center gap-1">
                    {product.colors.map((color) => (
                      <div
                        className={cn(
                          "inline-grid size-5 place-items-center rounded-full border-(--color)! shadow-md transition-[border-width,_padding]",
                          `cursor-pointer ${productTypes.color === color ? "border-4 p-0.5" : "border-0"}`,
                        )}
                        style={
                          {
                            "--color": color,
                          } as CSSProperties
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

              {/* ADD TO CART */}
              <div className="flex items-center justify-between">
                <Button size="sm" className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="s-full text-inherit" />
                  Add to cart
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
