import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = { className?: string };

export default function HelpSubmenu({ className }: Props) {
    return (
        <div className={cn("border-none!", className)}>
            <ul className="">
                <li className="text-muted-foreground hover:text-foreground px-2 py-1">
                    <Link href="/help/faq">FAQ</Link>
                </li>
                <li className="text-muted-foreground hover:text-foreground px-2 py-1">
                    <Link href="/help/faq">FAQ</Link>
                </li>
                <li className="text-muted-foreground hover:text-foreground px-2 py-1">
                    <Link href="/help/faq">Customer Service</Link>
                </li>
            </ul>
        </div>
    );
}
