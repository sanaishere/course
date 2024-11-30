/*
  Warnings:

  - You are about to drop the column `subCategoryId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CostType" AS ENUM ('FREE', 'COSTLY');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "parentId" TEXT;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "subCategoryId",
ADD COLUMN     "type" "CostType" NOT NULL;

-- DropTable
DROP TABLE "SubCategory";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
