-- DropForeignKey
ALTER TABLE "FileAccessLog" DROP CONSTRAINT "FileAccessLog_fileId_fkey";

-- AddForeignKey
ALTER TABLE "FileAccessLog" ADD CONSTRAINT "FileAccessLog_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
