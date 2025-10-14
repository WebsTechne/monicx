import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { invalidateCategories } from "@/lib/get-categories";

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

        invalidateCategories();

        return NextResponse.json(created, { status: 201 });
    } catch (err: any) {
        if (err?.name === "ZodError") {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    issues: err.errors || err.format(),
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

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const limit = Math.min(
            Math.max(Number(url.searchParams.get("limit") ?? 50), 1),
            200,
        ); // 1..200
        const skip = Math.max(Number(url.searchParams.get("skip") ?? 0), 0);

        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                imagePath: true,
                products: true,
            },
            orderBy: { createdAt: "desc" },
            take: limit,
            skip,
        });

        return NextResponse.json(
            { data: categories },
            {
                status: 200,
                headers: {
                    // small cache to reduce DB hits for identical requests
                    "Cache-Control":
                        "public, max-age=30, s-maxage=60, stale-while-revalidate=30",
                },
            },
        );
    } catch (err) {
        console.error("GET /api/categories error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
