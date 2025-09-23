// prisma/seed.ts
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const sizes = [
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
];

const colors = [
    { name: "blue", hex: "#3b82f6" },
    { name: "green", hex: "#10b981" },
    { name: "red", hex: "#ef4444" },
    { name: "yellow", hex: "#f59e0b" },
    { name: "purple", hex: "#8b5cf6" },
    { name: "orange", hex: "#fb923c" },
    { name: "pink", hex: "#ec4899" },
    { name: "brown", hex: "#a16207" },
    { name: "gray", hex: "#6b7280" },
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#ffffff" },
];

async function main() {
    // keep old category upsert behaviour
    await prisma.category.upsert({
        where: { slug: "tops" },
        update: { name: "Tops", description: "Shirts, blouses and tees" },
        create: {
            name: "Tops",
            slug: "tops",
            description: "Shirts, blouses and tees",
        },
    });

    // keep collections
    await prisma.collection.createMany({
        data: [
            { name: "Summer 2025", description: "Seasonal collection" },
            { name: "Basics", description: "Everyday essentials" },
        ],
        skipDuplicates: true,
    });

    // seed sizes (safe approach using findFirst -> create if missing)
    console.log("Seeding sizes...");
    for (const s of sizes) {
        const found = await prisma.size.findFirst({ where: { alpha: s } });
        if (!found) {
            await prisma.size.create({
                data: {
                    alpha: s,
                    gender: "unisex",
                },
            });
        }
    }

    // seed colors (safe findFirst -> create if missing)
    console.log("Seeding colors...");
    for (const c of colors) {
        const found = await prisma.color.findFirst({ where: { name: c.name } });
        if (!found) {
            await prisma.color.create({
                data: {
                    name: c.name,
                    hexCode: c.hex,
                },
            });
        }
    }

    // Optional sample product creation — comment out if you don't want a sample product.
    /*
  const existing = await prisma.product.findUnique({
    where: { sku: "PRD-0001" },
  });

  if (!existing) {
    await prisma.product.create({
      data: {
        sku: "PRD-0001",
        name: "Sample Tee",
        description: "A sample tee for testing",
        price: new Prisma.Decimal(10000.0),
        stock: 20,
      },
    });
  }
  */

    console.log("Seed complete");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
