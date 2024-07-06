-- AddForeignKey
ALTER TABLE "AccessList" ADD CONSTRAINT "AccessList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
