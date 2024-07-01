const mongoose = require("mongoose");
async function connectDB(url) {
  return mongoose.connect(url);
}

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// async function connectPrismaDB() {
//   try {
//     prisma = new PrismaClient({});
//     await prisma.$connect();
//     console.log("Connected to SQL database".bgGreen);
//   } catch (e) {
//     console.error("Failed to connect to the database", e);
//   }
// }
module.exports = module.exports = { connectDB, prisma };
