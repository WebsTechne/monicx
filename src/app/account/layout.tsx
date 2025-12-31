import { ReactNode } from "react";
import { AccountHeader } from "./_components/account-header";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AccountHeader />
      <main className="px-3">{children}</main>
    </>
  );
}
