import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Not signed in" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
