"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import useCartStore from "@/stores/cart-store";

export default function CartIcon() {
    const { cart, hasHydrated } = useCartStore();

    if (!hasHydrated) return null;

    return (
        <Button variant="ghost" className="header-icon" asChild>
            <Link href="/cart" className="relative">
                <ShoppingCart />
                <span className="text-background bg-primary absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full text-xs tracking-tighter">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
            </Link>
        </Button>
    );
}
