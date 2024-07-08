/*
  Warnings:

  - You are about to drop the column `created_at` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "created_at",
ADD COLUMN     "sharedDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
