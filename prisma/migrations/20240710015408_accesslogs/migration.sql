/*
  Warnings:

  - Added the required column `ipAddr` to the `FileAccessLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileAccessLog" ADD COLUMN     "ipAddr" TEXT NOT NULL;
