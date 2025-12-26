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
} from "../ui/dialog";
import Image from "next/image";
import logo from "@/assets/images/company/logo/logo-light.png";

export default function AuthPromptDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000); // 2s delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        aria-describedby="auth-prompt-desc"
        className="overflow-clip rounded-3xl p-5 pt-50 [&_>_*:not(.img-overlay)]:z-[1]"
      >
        <DialogHeader className="mx-auto w-95/100 !gap-0 md:w-85/100">
          <DialogTitle
            id="auth-prompt-title"
            className="!border-none font-black tracking-normal"
          >
            Edit profile
          </DialogTitle>
          <DialogDescription className="m-0!" id="auth-prompt-desc">
            Sign up or sign in to get the best experience.
          </DialogDescription>
        </DialogHeader>
        <Image
          src={logo}
          alt="logo"
          className="img-overlay absolute top-2 left-2 z-100! size-10"
        />
        <div className="img-overlay rounded-inherit absolute inset-0 z-0 bg-[url('https://images.pexels.com/photos/14856268/pexels-photo-14856268.jpeg?auto=compress&cs=tinysrgb&w=1600')] mask-b-from-20% mask-b-to-60% bg-cover bg-center [mask-size:cover]" />

        <Button type="button" className="mx-auto w-85/100" asChild>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="mx-auto w-85/100"
          asChild
        >
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>

        <DialogFooter className="items-center sm:justify-center">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="max-w-[max-content]"
            >
              Maybe later
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
