/*
  Warnings:

  - The values [processing,failed] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imagePath` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImageSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."OrderStatus_new" AS ENUM ('pending', 'paid', 'shipped', 'completed', 'canceled');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Order" ALTER COLUMN "status" TYPE "public"."OrderStatus_new" USING ("status"::text::"public"."OrderStatus_new");
ALTER TYPE "public"."OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "public"."OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "public"."Order" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."ProductImage" DROP CONSTRAINT "ProductImage_colorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductImageSize" DROP CONSTRAINT "ProductImageSize_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductImageSize" DROP CONSTRAINT "ProductImageSize_sizeId_fkey";

-- DropIndex
DROP INDEX "public"."Color_name_key";

-- DropIndex
DROP INDEX "public"."Product_slug_key";

-- DropIndex
DROP INDEX "public"."Size_alpha_key";

-- AlterTable
ALTER TABLE "public"."Collection" DROP COLUMN "imagePath";

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "slug" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."ProductImage";

-- DropTable
DROP TABLE "public"."ProductImageSize";
