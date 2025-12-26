"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type Props = { className?: string; data: Category[] };

export default function ShopSubmenu({
  className,
  data: categories = [],
}: Props) {
  return (
    <div
      className={cn(
        "nav:gap-7 grid max-w-dvw! grid-cols-3 gap-2 px-10!",
        className,
      )}
    >
      <ul className="">
        <li className="font-bold">Categories</li>
        {categories.map((c: Category) => (
          <li key={c.id}>
            <Link
              href={`/shop/categories/${c.slug}`}
              className="gap-1 underline-offset-3 hover:underline"
            >
              <span className="relative size-4 bg-red-300">
                <Image src={c.imagePath} alt={c.name} fill />
              </span>

              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="">
        <li className="font-bold">Categories</li>
        {categories.map((c: Category) => (
          <li key={c.id}>
            <Link
              href={`/shop/categories/${c.slug}`}
              className="underline-offset-3 hover:underline"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="">
        <li className="font-bold">Categories</li>
        {categories.map((c: Category) => (
          <li key={c.id}>
            <Link
              href={`/shop/categories/${c.slug}`}
              className="underline-offset-3 hover:underline"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
