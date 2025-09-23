// prisma.config.ts
import "dotenv/config"; // prisma CLI won't auto-load .env when using prisma.config.ts
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
    // Path to your Prisma schema file
    schema: path.join("prisma", "schema.prisma"),

    // Where migrations are stored
    migrations: {
        path: path.join("prisma", "migrations"),
        // Optional: some Prisma versions expect seed config under migrations
        // seed: "ts-node -r tsconfig-paths/register --transpile-only prisma/seed.ts",
        seed: "node -r ts-node/register -r tsconfig-paths/register prisma/seed.ts",
    },
});
