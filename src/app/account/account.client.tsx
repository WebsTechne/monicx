"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useState } from "react";

function AccountAlertDialog() {
  const { back, push } = useRouter();
  const [open, setOpen] = useState(true);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnTo =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {" "}
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You need to be signed in</AlertDialogTitle>
          <AlertDialogDescription>
            This page is part of your account. Sign in to continue and we’ll
            bring you right back here.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => back()}>Go back</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              push(`/auth/sign-in?returnTo=${encodeURIComponent(returnTo)}`)
            }
          >
            Sign in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function AccountAlert({
  variant,
  message: { title, body },
}: {
  variant: "default" | "destructive" | "success" | "error" | "info" | "warning";
  message: { title: string; body: string };
}) {
  return (
    <Alert variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{body}</AlertDescription>
    </Alert>
  );
}

export { AccountAlertDialog, AccountAlert };
