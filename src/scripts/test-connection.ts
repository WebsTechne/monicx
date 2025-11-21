import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Connecting to database...");
        const sizes = await prisma.size.findMany({ take: 1 });
        console.log("Successfully connected!");
        console.log("Sizes found:", sizes);
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
