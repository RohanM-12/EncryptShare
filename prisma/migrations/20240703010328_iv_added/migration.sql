-- AlterTable
ALTER TABLE "File" ADD COLUMN     "initializationVector" TEXT NOT NULL DEFAULT 'none';
