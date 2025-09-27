import { useTheme } from "next-themes";
import IMAGES from "@/assets/images";
import useMounted from "@/hooks/use-mounted";
import Image from "next/image";
import Link from "next/link";

export default function FormHeading({
    title,
    titleId,
    description,
}: {
    title: string;
    titleId: string;
    description?: string;
}) {
    const mounted = useMounted();

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <div className="mt-4 flex flex-col items-center">
            <Link href="/" className="contents">
                {mounted ? (
                    <Image
                        src={isDark ? IMAGES.logo.dark : IMAGES.logo.light}
                        alt="logo"
                        className="m-0! aspect-3/2 w-18 object-cover"
                    />
                ) : (
                    <span className="bg-muted aspect-3/2 w-25 rounded-sm"></span>
                )}
            </Link>

            <h1 id={titleId} className="p-2 font-bold">
                {title}
            </h1>

            {description ? (
                <p className="form-description">{description}</p>
            ) : null}
        </div>
    );
}
