"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/components/providers/sidebar-provider";

type Props = { className?: string; data: Category[] };

export default function ShopSubmenu({
  className,
  data: categories = [],
}: Props) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className={cn("nav:gap-7 grid max-w-dvw! grid-cols-3 gap-2", className)}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <ul key={i} className="flex flex-col gap-2">
          <li className="font-bold">Categories</li>
          {categories.map((c: Category) => (
            <li key={c.id} className="p-0.25">
              <Link
                href={`/shop/categories/${c.slug}`}
                className="flex items-center gap-1 underline-offset-3 hover:underline"
                onClick={toggleSidebar}
              >
                <span className="relative size-5">
                  <Image
                    src={c.imagePath}
                    alt={c.name}
                    fill
                    className="rounded-[5px] object-cover"
                  />
                </span>

                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
