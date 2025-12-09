import { NextResponse } from "next/server";
import { getColors } from "@/lib/get-colors";

export async function GET() {
  const data = await getColors();
  return NextResponse.json({ data });
}
