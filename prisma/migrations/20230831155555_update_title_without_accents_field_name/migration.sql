/*
  Warnings:

  - You are about to drop the column `titleWithoutAccent` on the `Recipe_en` table. All the data in the column will be lost.
  - You are about to drop the column `titleWithoutAccent` on the `Recipe_es` table. All the data in the column will be lost.
  - You are about to drop the column `titleWithoutAccent` on the `Recipe_lt` table. All the data in the column will be lost.
  - Added the required column `titleWithoutAccents` to the `Recipe_en` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleWithoutAccents` to the `Recipe_es` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleWithoutAccents` to the `Recipe_lt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe_en" DROP COLUMN "titleWithoutAccent",
ADD COLUMN     "titleWithoutAccents" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe_es" DROP COLUMN "titleWithoutAccent",
ADD COLUMN     "titleWithoutAccents" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe_lt" DROP COLUMN "titleWithoutAccent",
ADD COLUMN     "titleWithoutAccents" TEXT NOT NULL;
