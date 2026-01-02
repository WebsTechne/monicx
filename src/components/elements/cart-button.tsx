"use client";

import { ShoppingCartIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import useCartStore from "@/stores/cart-store";
import { useSidebar } from "../providers/sidebar-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CartButton() {
  const { cart, hasHydrated } = useCartStore();
  const { setOpenMobile } = useSidebar();

  if (!hasHydrated) return null;

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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
      <ShoppingCartIcon className="size-6!" />
      {cartCount > 0 && (
        <span className="text-background bg-primary absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full text-xs tracking-tighter">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
