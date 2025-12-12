import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex-center h-screen">
      <div className="p-10 text-center">
        <h1 className="font-mono text-4xl font-black">403 Forbidden</h1>
        <p>You don’t have permission to be here.</p>
        <div className="flex-center flex-row gap-2 p-2">
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            Home
          </Link>
          <Link href="/shop" className={buttonVariants({ variant: "link" })}>
            Shop
          </Link>
          <Link
            href="/auth/sign-in"
            className={buttonVariants({ variant: "link" })}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
