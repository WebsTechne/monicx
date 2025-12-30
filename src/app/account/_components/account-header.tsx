import IMAGES from "@/assets/images";
import CartIcon from "@/components/elements/cart-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import useMounted from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Bell, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const AccountHeader = ({ back = false }: { back: boolean }) => {
  const mounted = useMounted();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="bg-card/80 sticky top-0 flex h-(--header) items-center justify-between backdrop-blur-md">
      <Link href="/">
        {mounted ? (
          <Image
            src={isDark ? IMAGES.logo.dark : IMAGES.logo.light}
            alt="logo"
            className="m-0! aspect-3/2 w-10 object-cover"
          />
        ) : (
          <span className="bg-muted aspect-3/2 w-15 rounded-sm"></span>
        )}
      </Link>

      <section className="relative flex h-full items-center justify-end gap-2.5">
        <Button variant="ghost" className="header-icon hidden sm:inline-flex">
          <Bell />
        </Button>

        <Link
          href="/wishlist"
          className={cn(buttonVariants({ variant: "ghost" }), "header-icon")}
          // onClick={() => {
          //   setOpenMobile(false);
          // }}
        >
          <Heart />
        </Link>
        <CartIcon />
      </section>
    </header>
  );
};

export { AccountHeader };
