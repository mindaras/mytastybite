-- DropIndex
DROP INDEX "Recipe_en_title_key";

-- CreateIndex
CREATE INDEX "Recipe_en_title_idx" ON "Recipe_en"("title");
