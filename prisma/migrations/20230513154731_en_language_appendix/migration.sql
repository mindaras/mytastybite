/*
  Warnings:

  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Recipe";

-- CreateTable
CREATE TABLE "Recipe_en" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preparation" TEXT[],
    "ingredients" TEXT[],
    "servings" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "nutrition" TEXT[],
    "category" "Category" NOT NULL,
    "diet" "Diet" NOT NULL,

    CONSTRAINT "Recipe_en_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_en_title_key" ON "Recipe_en"("title");

-- CreateIndex
CREATE INDEX "Recipe_en_category_idx" ON "Recipe_en"("category");

-- CreateIndex
CREATE INDEX "Recipe_en_diet_idx" ON "Recipe_en"("diet");
