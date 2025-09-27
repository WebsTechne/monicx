"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { BadgeCheck } from "lucide-react";

export default function ChangePasswordDialog({
    children,
}: {
    children: ReactNode;
}) {
    const timer: number = 6;
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!open) return;
        const id = setTimeout(() => {
            router.push("/auth/sign-in"); // 👈 change to your destination
        }, timer * 1000);

        return () => clearTimeout(id);
    }, [open, timer, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="change-pass-success-title"
                aria-describedby="change-pass-success-desc"
                className="overflow-clip rounded-3xl p-5 [&_>_*:not(.img-overlay)]:z-[1]"
            >
                <DialogHeader>
                    <BadgeCheck
                        size={80}
                        strokeWidth={1.5}
                        fill="rgb(from #167f22 r g b / .7)"
                        className="text-background mx-auto mb-3"
                        aria-hidden="true"
                    />
                    <DialogTitle id="change-pass-success-title">
                        Success!
                    </DialogTitle>
                    <DialogDescription
                        id="change-pass-success-desc"
                        className="m-0! leading-normal"
                    >
                        You have successfully changed your password. You&apos;ll
                        be redirected to the sign in page shortly to continue
                        sign-ing in
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="bg-foreground/30 h-[2px] w-full rounded-full">
                        <div
                            style={{ animationDuration: `${timer}s` }}
                            className={`bg-foreground animate-elapse h-full w-full rounded-[inherit]`}
                        ></div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
