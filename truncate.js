const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function truncateTables() {
  try {
    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // Truncate UserKeys table first
      await prisma.$executeRaw`TRUNCATE TABLE "UserKeys"   CASCADE;`;
      console.log("UserKeys table truncated successfully");

      // Truncate user table
      await prisma.$executeRaw`TRUNCATE TABLE "User"   CASCADE;`;
      console.log("User table truncated successfully");
    });
  } catch (error) {
    console.error("Error truncating tables:", error);
  } finally {
    await prisma.$disconnect();
  }
}

truncateTables();
