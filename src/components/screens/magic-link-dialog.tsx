"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default function MagicLinkDialog({
    email,
    children,
}: {
    email: string;
    children: any;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                role="dialog"
                aria-modal="true"
                aria-labelledby="magic-link-title"
                aria-describedby="magic-link-desc"
                className="overflow-clip rounded-3xl p-5 [&_>_*:not(.img-overlay)]:z-[1]"
            >
                <DialogHeader>
                    <DialogTitle id="magic-link-title">
                        Verify Email
                    </DialogTitle>
                    <DialogDescription
                        id="magic-link-desc"
                        className="m-0! leading-normal"
                        aria-live="polite"
                    >
                        A verification link has been sent to: <b>{email}</b>.
                        After you have verified your email, you'll automatically
                        be redirected to a page to change your password.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
