/*
  Warnings:

  - You are about to drop the column `expiredTime` on the `Discount` table. All the data in the column will be lost.
  - Added the required column `expiredDate` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "expiredTime",
ADD COLUMN     "expiredDate" TIMESTAMP(3) NOT NULL;
