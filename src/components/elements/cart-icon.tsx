"use client";

import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "../ui/button";
import useCartStore from "@/stores/cart-store";
import { useSidebar } from "../providers/sidebar-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CartIcon() {
  const { cart, hasHydrated } = useCartStore();
  const { setOpenMobile } = useSidebar();

  if (!hasHydrated) return null;

  return (
    <Link
      href="/cart"
      prefetch
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "header-icon relative",
      )}
      onClick={() => {
        setOpenMobile(false);
      }}
    >
      <ShoppingCart />
      <span className="text-background bg-primary absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full text-xs tracking-tighter">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
}
