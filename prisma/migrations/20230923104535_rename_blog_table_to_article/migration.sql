/*
  Warnings:

  - You are about to drop the `Blog_en` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog_es` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog_lt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Blog_en";

-- DropTable
DROP TABLE "Blog_es";

-- DropTable
DROP TABLE "Blog_lt";

-- CreateTable
CREATE TABLE "Article_en" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleWithoutAccents" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_en_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article_es" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleWithoutAccents" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_es_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article_lt" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleWithoutAccents" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_lt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_en_externalId_key" ON "Article_en"("externalId");

-- CreateIndex
CREATE INDEX "Article_en_titleWithoutAccents_idx" ON "Article_en"("titleWithoutAccents");

-- CreateIndex
CREATE UNIQUE INDEX "Article_es_externalId_key" ON "Article_es"("externalId");

-- CreateIndex
CREATE INDEX "Article_es_titleWithoutAccents_idx" ON "Article_es"("titleWithoutAccents");

-- CreateIndex
CREATE UNIQUE INDEX "Article_lt_externalId_key" ON "Article_lt"("externalId");

-- CreateIndex
CREATE INDEX "Article_lt_titleWithoutAccents_idx" ON "Article_lt"("titleWithoutAccents");
