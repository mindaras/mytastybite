/*
  Warnings:

  - A unique constraint covering the columns `[titleWithoutAccents]` on the table `Article_en` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[titleWithoutAccents]` on the table `Article_es` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[titleWithoutAccents]` on the table `Article_lt` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Article_en` table without a default value.
  - Added the required column `updatedAt` to the `Article_es` table without a default value.
  - Added the required column `updatedAt` to the `Article_lt` table without a default value.

*/
-- AlterTable
ALTER TABLE "Article_en" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Article_es" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Article_lt" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Article_en_titleWithoutAccents_key" ON "Article_en"("titleWithoutAccents");

-- CreateIndex
CREATE UNIQUE INDEX "Article_es_titleWithoutAccents_key" ON "Article_es"("titleWithoutAccents");

-- CreateIndex
CREATE UNIQUE INDEX "Article_lt_titleWithoutAccents_key" ON "Article_lt"("titleWithoutAccents");
