-- CreateTable
CREATE TABLE "FileAccessLog" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileAccessLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileAccessLog" ADD CONSTRAINT "FileAccessLog_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAccessLog" ADD CONSTRAINT "FileAccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
