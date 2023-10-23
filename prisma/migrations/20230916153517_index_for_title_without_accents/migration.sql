-- DropIndex
DROP INDEX "Recipe_en_title_idx";

-- DropIndex
DROP INDEX "Recipe_es_title_idx";

-- DropIndex
DROP INDEX "Recipe_lt_title_idx";

-- CreateIndex
CREATE INDEX "Recipe_en_titleWithoutAccents_idx" ON "Recipe_en"("titleWithoutAccents");

-- CreateIndex
CREATE INDEX "Recipe_es_titleWithoutAccents_idx" ON "Recipe_es"("titleWithoutAccents");

-- CreateIndex
CREATE INDEX "Recipe_lt_titleWithoutAccents_idx" ON "Recipe_lt"("titleWithoutAccents");
