import { auth } from "@/lib/auth";
import { getUserInternal } from "@/lib/fetch/get-user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { AccountAlert, AccountAlertDialog } from "./account.client";
import { notFound } from "next/navigation";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return <AccountAlertDialog />;
  }

  const user = await getUserInternal(session.user.id);
  if (!user) {
    return notFound();
  }

  const firstEmpty = !user.firstName || user.firstName.trim() === "";
  const lastEmpty = !user.lastName || user.lastName.trim() === "";

  if (firstEmpty || lastEmpty) {
    return (
      <AccountAlert
        variant="success"
        message={{
          title: "Incomplete Profile",
          body: "Please complete your profile to access all features.",
        }}
      />
    );
  }

  return <></>;
}
