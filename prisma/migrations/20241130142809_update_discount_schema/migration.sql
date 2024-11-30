/*
  Warnings:

  - Added the required column `code` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "code" TEXT NOT NULL;
