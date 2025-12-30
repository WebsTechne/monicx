"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const LS_KEY = "monicx:profilePromptNextShow";
const DAY_MS = 24 * 60 * 60 * 1000;

function CompleteProfileDialog() {
  const { push } = useRouter();

  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // run on mount on every page
    const nextShowStr = localStorage.getItem(LS_KEY);
    const now = Date.now();

    if (nextShowStr) {
      const nextShow = Number(nextShowStr) || 0;
      if (nextShow > now) {
        setChecking(false);
        return; // do nothing until nextShow
      }
    }

    // key absent or expired — ask server if we should show
    (async () => {
      try {
        const r = await fetch("/api/me/should-show-profile-prompt", {
          method: "GET",
          headers: { accept: "application/json" },
        });
        if (!r.ok) {
          // fail safe: don't spam user if server error
          setChecking(false);
          return;
        }
        const data = await r.json();
        if (data?.show) {
          // set next allowed show to now + 24h immediately (prevents multiple pops on navigation)
          localStorage.setItem(LS_KEY, String(now + DAY_MS));
          setOpen(true);
        }
      } catch (err) {
        // network error: be conservative and don't show
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  function onCompleteProfileClick() {
    setOpen(false);
    push("/account");
  }

  // When user completes profile (on your profile page) you MUST call:
  // localStorage.removeItem(LS_KEY);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Complete your profile</AlertDialogTitle>
          <AlertDialogDescription>
            You signed up with email — nice and fast. Add a few details so you
            can use all features (payments, payouts, trust badges).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Later
          </AlertDialogCancel>
          <AlertDialogAction onClick={onCompleteProfileClick}>
            Complete profile
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { CompleteProfileDialog };
