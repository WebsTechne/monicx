"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import useCartStore from "@/stores/cart-store";
import { useRouter } from "next/navigation";
import { useSidebar } from "../providers/sidebar-provider";

export default function CartIcon() {
    const { push } = useRouter();
    const { cart, hasHydrated } = useCartStore();
    const { setOpenMobile } = useSidebar();

    if (!hasHydrated) return null;

    return (
        <Button
            variant="ghost"
            className="header-icon relative"
            onClick={() => {
                push("/cart");
                setOpenMobile(false);
            }}
        >
            <ShoppingCart />
            <span className="text-background bg-primary absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full text-xs tracking-tighter">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
        </Button>
    );
}
