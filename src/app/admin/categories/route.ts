// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        // Simple auth placeholder: replace with your real check (NextAuth, session, JWT, etc.)
        // Example: const user = await getServerSession(...) and check role === 'admin'
        // If you don't protect this, anyone can create categories. Do not be that person.
        // const user = ...
        // if (!user || user.role !== 'admin') return NextResponse.json({ error: 'forbidden' }, { status: 403 });

        const body = await req.json();
        const { name, slug: maybeSlug, description, imageUrl } = body;

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "name is required" },
                { status: 400 },
            );
        }

        const slug =
            (maybeSlug && String(maybeSlug).trim()) ||
            slugify(name, { lower: true, strict: true });

        // Optional: ensure slug uniqueness by appending counter if needed
        let finalSlug = slug;
        let counter = 1;
        while (
            await prisma.category.findUnique({ where: { slug: finalSlug } })
        ) {
            finalSlug = `${slug}-${counter++}`;
        }

        const newCategory = await prisma.category.create({
            data: {
                name: name.trim(),
                slug: finalSlug,
                description: description ? String(description) : null,
                // If you added `imagePath` to your model, save it here.
                // For now I'll assume Field is `imagePath` (see schema change suggestion).
                ...(imageUrl
                    ? {
                          description:
                              description ?? null /* imagePath: imageUrl */,
                      }
                    : {}),
            },
        });

        return NextResponse.json(
            { success: true, category: newCategory },
            { status: 201 },
        );
    } catch (err: any) {
        console.error("create category error:", err);
        return NextResponse.json(
            { error: "server error", detail: String(err.message ?? err) },
            { status: 500 },
        );
    } finally {
        // Prisma client: don't call prisma.$disconnect() every request in Vercel-like envs;
        // keep it open. This is a minimal example.
    }
}
