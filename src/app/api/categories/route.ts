import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getCategories } from "@/lib/fetch/get-categories";
import { revalidateTag } from "next/cache";

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

    //  check if slug already exists
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 },
      );
    }

    const created = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        imagePath: data.imagePath,
      },
    });

    revalidateTag("categories", {});

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
    console.error("Category POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const data = await getCategories();
  return NextResponse.json({ data });
}
