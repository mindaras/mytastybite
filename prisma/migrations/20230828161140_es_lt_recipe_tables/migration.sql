-- CreateTable
CREATE TABLE "Recipe_es" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preparation" TEXT[],
    "ingredients" TEXT[],
    "servings" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "nutrition" TEXT[],
    "category" "Category" NOT NULL,
    "diet" "Diet" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_es_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe_lt" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preparation" TEXT[],
    "ingredients" TEXT[],
    "servings" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "nutrition" TEXT[],
    "category" "Category" NOT NULL,
    "diet" "Diet" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_lt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_es_externalId_key" ON "Recipe_es"("externalId");

-- CreateIndex
CREATE INDEX "Recipe_es_category_idx" ON "Recipe_es"("category");

-- CreateIndex
CREATE INDEX "Recipe_es_diet_idx" ON "Recipe_es"("diet");

-- CreateIndex
CREATE INDEX "Recipe_es_title_idx" ON "Recipe_es"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_lt_externalId_key" ON "Recipe_lt"("externalId");

-- CreateIndex
CREATE INDEX "Recipe_lt_category_idx" ON "Recipe_lt"("category");

-- CreateIndex
CREATE INDEX "Recipe_lt_diet_idx" ON "Recipe_lt"("diet");

-- CreateIndex
CREATE INDEX "Recipe_lt_title_idx" ON "Recipe_lt"("title");
