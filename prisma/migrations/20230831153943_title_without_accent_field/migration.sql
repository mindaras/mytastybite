/*
  Warnings:

  - Added the required column `titleWithoutAccent` to the `Recipe_en` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleWithoutAccent` to the `Recipe_es` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleWithoutAccent` to the `Recipe_lt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe_en" ADD COLUMN     "titleWithoutAccent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe_es" ADD COLUMN     "titleWithoutAccent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe_lt" ADD COLUMN     "titleWithoutAccent" TEXT NOT NULL;
