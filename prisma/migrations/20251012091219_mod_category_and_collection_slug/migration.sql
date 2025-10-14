/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Collection" ADD COLUMN     "imagePath" VARCHAR(255),
ADD COLUMN     "slug" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "public"."Collection"("slug");
