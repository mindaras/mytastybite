-- CreateTable
CREATE TABLE "Blog_en" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleWithoutAccents" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_en_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog_es" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleWithoutAccents" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_es_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog_lt" (
    "id" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleWithoutAccents" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_lt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_en_externalId_key" ON "Blog_en"("externalId");

-- CreateIndex
CREATE INDEX "Blog_en_titleWithoutAccents_idx" ON "Blog_en"("titleWithoutAccents");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_es_externalId_key" ON "Blog_es"("externalId");

-- CreateIndex
CREATE INDEX "Blog_es_titleWithoutAccents_idx" ON "Blog_es"("titleWithoutAccents");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_lt_externalId_key" ON "Blog_lt"("externalId");

-- CreateIndex
CREATE INDEX "Blog_lt_titleWithoutAccents_idx" ON "Blog_lt"("titleWithoutAccents");
