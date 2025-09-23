/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alpha]` on the table `Size` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."OrderStatus" ADD VALUE 'processing';
ALTER TYPE "public"."OrderStatus" ADD VALUE 'failed';

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "imagePath" VARCHAR(255);

-- AlterTable
ALTER TABLE "public"."Collection" ADD COLUMN     "imagePath" VARCHAR(255);

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "shortDescription" VARCHAR(255),
ADD COLUMN     "slug" VARCHAR(150) NOT NULL;

-- CreateTable
CREATE TABLE "public"."ProductImage" (
    "id" SERIAL NOT NULL,
    "productId" UUID NOT NULL,
    "colorId" INTEGER,
    "url" VARCHAR(1024) NOT NULL,
    "alt" VARCHAR(255),
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductImageSize" (
    "imageId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "ProductImageSize_pkey" PRIMARY KEY ("imageId","sizeId")
);

-- CreateIndex
CREATE INDEX "ProductImageSize_sizeId_idx" ON "public"."ProductImageSize"("sizeId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "public"."Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Size_alpha_key" ON "public"."Size"("alpha");

-- AddForeignKey
ALTER TABLE "public"."ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductImage" ADD CONSTRAINT "ProductImage_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductImageSize" ADD CONSTRAINT "ProductImageSize_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductImageSize" ADD CONSTRAINT "ProductImageSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
