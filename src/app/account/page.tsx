import { auth } from "@/lib/auth";
import { getUserInternal } from "@/lib/fetch/get-user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { AccountAlert, AccountAlertDialog } from "./account.client";
import { notFound } from "next/navigation";
import Link from "next/link";

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
  const phoneEmpty = !user.phone || user.phone.trim() === "";

  if (firstEmpty || lastEmpty || phoneEmpty) {
    return (
      <AccountAlert variant="info" title="Incomplete Profile">
        <p>Please complete your profile to access all features.</p>
        <Link href="/account/profile?b" className="underline">
          Profile
        </Link>
      </AccountAlert>
    );
  }

  return <></>;
}
