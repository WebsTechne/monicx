import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getCollections, invalidateCollections } from "@/lib/get-collections";

const bodySchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  imagePath: z.string().min(1),
  description: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = bodySchema.parse(json);

    // optional: check if slug already exists
    const existing = await prisma.collection.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 },
      );
    }

    const created = await prisma.collection.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        imagePath: data.imagePath,
      },
    });

    invalidateCollections();

    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: err.issues,
        },
        { status: 422 },
      );
    }
    console.error("Collection POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const data = await getCollections();
  return NextResponse.json({ data });
}
