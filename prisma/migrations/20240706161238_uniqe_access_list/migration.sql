/*
  Warnings:

  - A unique constraint covering the columns `[fileId,userId]` on the table `AccessList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessList_fileId_userId_key" ON "AccessList"("fileId", "userId");
