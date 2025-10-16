import { cn } from "@/lib/utils";
type Props = { className?: string };
import { useCategoriesData } from "@/context/providers";
import Link from "next/link";

export default function ShopSubmenu({ className }: Props) {
    const { data: categories } = useCategoriesData();

    return (
        <div
            className={cn(
                "nav:gap-7 grid max-w-dvw! grid-cols-3 gap-2 px-10!",
                className,
            )}
        >
            <ul className="">
                <li className="font-bold">Categories</li>
                {categories.map((c) => (
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
                {categories.map((c) => (
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
                {categories.map((c) => (
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
