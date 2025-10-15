"use client";

import PaymentForm from "@/components/cart/payment-form";
import ShippingForm from "@/components/cart/shipping-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/stores/cart-store";
import { ShippingFormInputs } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const steps = [
    { id: 1, title: "Shopping Cart" },
    { id: 2, title: "Shipping Address" },
    { id: 3, title: "Payment Method" },
];

function CartPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

    const activeStep = parseInt(searchParams.get("step") || "1");

    const { cart, removeFromCart } = useCartStore();

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4">
                {/* TITLE */}
                <h1 className="text-2xl"> Your Shopping Cart</h1>
                {/* STEPS */}
                <div className="flex flex-row flex-wrap items-center justify-center gap-7 lg:gap-10">
                    {steps.map((s) => (
                        <div
                            className={cn(
                                "flex shrink-0 items-center gap-1.5 pb-2",
                                s.id === activeStep
                                    ? "text-foreground border-foreground border-b-2"
                                    : "text-muted-foreground",
                            )}
                            key={s.id}
                        >
                            <span
                                className={cn(
                                    "grid size-6 place-items-center rounded-full text-sm",
                                    s.id === activeStep
                                        ? "text-primary-foreground bg-primary"
                                        : "text-muted bg-muted-foreground",
                                )}
                            >
                                {s.id}
                            </span>
                            <p
                                className={cn(
                                    "m-0! line-clamp-1 overflow-hidden text-sm duration-300",
                                    s.id !== activeStep && "w-0 md:w-max",
                                )}
                            >
                                {s.title}
                            </p>
                        </div>
                    ))}
                </div>

                {/* STEPS & DETAILS */}
                <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-8">
                    {/* STEPS */}
                    <div className="bg-card flex h-max w-full grow-0 flex-col gap-3.5 rounded-2xl border-1 p-4 lg:w-7/12">
                        {activeStep === 1 ? (
                            cart.length >= 1 ? (
                                cart.map((item) => (
                                    // single cart item
                                    <div
                                        className="flex items-center justify-between"
                                        key={
                                            item.id +
                                            item.selectedSize +
                                            item.selectedColor
                                        }
                                    >
                                        {/* IMAGE & DETAILS */}
                                        <div className="flex gap-2">
                                            <span className="relative size-30 overflow-clip rounded-lg bg-gray-50">
                                                <Image
                                                    className="object-contain"
                                                    src={
                                                        item.images[
                                                            item.selectedColor
                                                        ]
                                                    }
                                                    alt={item.name}
                                                    fill
                                                />
                                            </span>
                                            {/* ITEM DETAILS */}
                                            <div className="flex flex-col justify-between">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-medium">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs">
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs">
                                                        Size:{" "}
                                                        {item.selectedSize.toUpperCase()}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs">
                                                        Color:{" "}
                                                        {item.selectedColor}
                                                    </span>
                                                </div>
                                                <span className="font-semibold">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        {/* DELETE BUTTON */}
                                        <button
                                            onClick={() => removeFromCart(item)}
                                            className="btn bg-destructive/10 hover:bg-destructive/20 text-destructive grid size-8 place-items-center rounded-full duration-300"
                                        >
                                            <Trash2 className="size-5" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground m-0!">
                                    You haven&apos;t added any products to cart.
                                    Continue browsing at the{" "}
                                    <Link
                                        href="/shop"
                                        className="text-foreground hover:text-primary"
                                    >
                                        Shop
                                    </Link>{" "}
                                </p>
                            )
                        ) : activeStep === 2 ? (
                            <ShippingForm setShippingForm={setShippingForm} />
                        ) : activeStep === 3 && shippingForm ? (
                            <PaymentForm />
                        ) : (
                            <span className="text-muted-foreground">
                                Please fill in the shipping form to continue.
                            </span>
                        )}
                    </div>
                    {/* DETAILS */}
                    <div className="bg-card flex h-max w-full grow-0 flex-col gap-3.5 rounded-2xl border-1 p-4 lg:w-5/12">
                        <h2 className="font-semibold">Cart Details</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="font-semibold">
                                    $
                                    {cart
                                        .reduce(
                                            (acc, item) =>
                                                acc +
                                                item.price * item.quantity,
                                            0,
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Discount (10%)
                                </span>
                                <span className="text-destructive font-semibold">
                                    -$10
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Shipping Fee
                                </span>
                                <span className="font-semibold">$10</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">
                                    $
                                    {cart
                                        .reduce(
                                            (acc, item) =>
                                                acc +
                                                item.price * item.quantity,
                                            0,
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>
                        </div>
                        {activeStep === 1 && (
                            <Button
                                className="w-full"
                                onClick={() =>
                                    router.push("/cart?step=2", {
                                        scroll: false,
                                    })
                                }
                            >
                                Continue
                                <ArrowRight />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default function CartPage() {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl">Your Shopping Cart</h1>
                    <div className="flex items-center gap-4">
                        <div className="bg-muted h-8 w-8 animate-pulse rounded-full"></div>
                        <div className="bg-muted h-8 w-32 animate-pulse rounded"></div>
                        <div className="bg-muted h-8 w-8 animate-pulse rounded-full"></div>
                    </div>
                    <div className="w-full max-w-4xl">
                        <div className="bg-muted h-64 animate-pulse rounded-lg"></div>
                    </div>
                </div>
            }
        >
            <CartPageContent />
        </Suspense>
    );
}
