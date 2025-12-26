import { NextResponse } from "next/server";
import { getSizes } from "@/lib/fetch/get-sizes";

export async function GET() {
  const data = await getSizes();
  return NextResponse.json({ data });
}
