-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Breakfast', 'Dinner', 'Lunch', 'Snack', 'Desserts');

-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('Healthy', 'Vegetarian', 'Vegan', 'Keto', 'LowCarb', 'None');

-- CreateTable
CREATE TABLE "Recipe" (
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

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_title_key" ON "Recipe"("title");

-- CreateIndex
CREATE INDEX "Recipe_category_idx" ON "Recipe"("category");

-- CreateIndex
CREATE INDEX "Recipe_diet_idx" ON "Recipe"("diet");
