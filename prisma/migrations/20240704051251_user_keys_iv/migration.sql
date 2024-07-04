/*
  Warnings:

  - You are about to drop the column `iv` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "iv";

-- AlterTable
ALTER TABLE "UserKeys" ADD COLUMN     "iv" TEXT NOT NULL DEFAULT '';
