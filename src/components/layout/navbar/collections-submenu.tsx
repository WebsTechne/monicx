import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCollectionsData } from "@/context/providers";

type Props = { className?: string };

/* const navInfo = [
    {
        imagePath: "/images/christmas-2024-collection.jpeg",
        slug: "christmas-2024-collection",
        name: "Christmas 2024 Collection",
        description: "Christmas 2024 Collection",
    },
    {
        imagePath: "/images/tornado-warning-collection.jpeg",
        slug: "tornado-warning-collection",
        name: "Tornado Warning Collection",
        description: "Tornado Warning Collection",
    },
    {
        imagePath: "/images/retro-collection.jpeg",
        slug: "retro-collection",
        name: "Retro Collection",
        description: "Retro Collection",
    },
    { 
        imagePath: "/images/kids-native-collection.jpeg",
        slug: "kids-native-collection",
        name: "Kids Native Collection",
        description: "Kids Native Collection",
    },
]; */

export default function CollectionsSubmenu({ className }: Props) {
    const { data: navInfo } = useCollectionsData();

    return (
        <ul
            className={cn(
                "nav:grid-cols-2 grid max-w-150 grid-cols-1 gap-1",
                className,
            )}
        >
            {navInfo.map((item, index) => (
                <Link
                    href={`/shop/collections/${item.slug}`}
                    className="hover:bg-muted flex rounded-lg p-1"
                    key={`${item.slug}${index}`}
                >
                    <li className="flex flex-1 items-center gap-1.5">
                        <span className="aspect-1 nav:w-9! relative w-10 overflow-clip rounded-md">
                            <Image
                                src={item.imagePath}
                                alt={item.slug}
                                fill
                                className="object-cover"
                            />
                        </span>
                        <div className="flex flex-1 flex-col items-center justify-start">
                            <h3 className="text-foreground w-full shrink-0 text-base leading-tight text-ellipsis whitespace-nowrap">
                                {item.name}
                            </h3>
                            <span className="text-muted-foreground line-clamp-1 w-full shrink-0 text-left! text-[13px] leading-tight">
                                {item.description}
                            </span>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    );
}
