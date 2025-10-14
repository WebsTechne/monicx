/*
  Warnings:

  - Made the column `description` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagePath` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Collection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagePath` on table `Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "imagePath" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Collection" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "imagePath" SET NOT NULL;
