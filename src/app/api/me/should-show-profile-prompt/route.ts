// app/api/me/should-show-profile-prompt/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserInternal } from "@/lib/fetch/get-user"; // your prisma helper for fetching user data

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    }); // implement per your better-auth usage
    console.log(session);
    if (!session?.user.id) {
      return NextResponse.json({ show: false });
    }

    const user = await getUserInternal(session.user.id); // your prisma wrapper
    if (!user) return NextResponse.json({ show: false });

    const firstEmpty = !user.firstName || user.firstName.trim() === "";
    const lastEmpty = !user.lastName || user.lastName.trim() === "";

    // show only when either is missing (matches your rule)
    const show = firstEmpty || lastEmpty;
    return NextResponse.json({ show });
  } catch (err) {
    // on error, don't show
    return NextResponse.json({ show: false }, { status: 500 });
  }
}
