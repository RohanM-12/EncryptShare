-- DropForeignKey
ALTER TABLE "AccessList" DROP CONSTRAINT "AccessList_fileId_fkey";

-- DropForeignKey
ALTER TABLE "UserKeys" DROP CONSTRAINT "UserKeys_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserKeys" ADD CONSTRAINT "UserKeys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessList" ADD CONSTRAINT "AccessList_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
