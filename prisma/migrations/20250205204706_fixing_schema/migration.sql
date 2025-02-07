/*
  Warnings:

  - You are about to drop the column `userId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_userId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "userId";
