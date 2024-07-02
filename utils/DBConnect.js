const mongoose = require("mongoose");
async function connectDB(url) {
  return mongoose.connect(url);
}

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = module.exports = { connectDB, prisma };
