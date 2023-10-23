/*
  Warnings:

  - The primary key for the `Recipe_en` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Recipe_en` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `externalId` to the `Recipe_en` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe_en" DROP CONSTRAINT "Recipe_en_pkey",
ADD COLUMN     "externalId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Recipe_en_pkey" PRIMARY KEY ("id");
