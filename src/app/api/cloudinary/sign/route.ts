import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// server-only config (do NOT use NEXT_PUBLIC_* for secrets)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FOLDERS = new Set([
  "monicx/categories",
  "monicx/collections",
  "monicx/products",
  "monicx/banners",
  "monicx/ads",
  "monicx/authors",
  "monicx/users",
]);

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // <-- use Request or NextRequest
  // optionally enforce authentication here
  // const user = await getUserFromRequest(req); if (!user) return NextResponse.json({ error: 'unauth' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const params = body.paramsToSign ?? {};
  const folder = params.folder;
  const public_id = params.public_id;

  if (folder && !ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const toSign: Record<string, string | number> = { timestamp };
  if (folder) toSign.folder = folder;
  if (public_id) toSign.public_id = public_id;

  const signature = cloudinary.utils.api_sign_request(
    toSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    folder: folder ?? undefined,
    public_id: public_id ?? undefined,
  });
}
