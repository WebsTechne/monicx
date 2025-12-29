import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { replace } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    replace("/");
  }
  return <div className="p-4.5 pt-7 pb-4">{children}</div>;
}
