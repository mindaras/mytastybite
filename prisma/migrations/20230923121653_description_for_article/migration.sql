/*
  Warnings:

  - Added the required column `description` to the `Article_en` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Article_es` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Article_lt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article_en" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Article_es" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Article_lt" ADD COLUMN     "description" TEXT NOT NULL;
