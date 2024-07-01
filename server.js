const express = require("express");

const appRoutes = require("./routes");
const cors = require("cors");
const { connectDB, prisma } = require("./utils/DBConnect");
require("dotenv/config");
require("colors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(appRoutes);

//MongoDB connection
connectDB(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database".bgWhite))
  .catch((error) => console.log(error.message));

// prismaDb connection
(async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database".bgGreen);
  } catch (e) {
    console.error("Failed to connect to the database", e);
  }
})();

app.listen(process.env.PORT, () =>
  console.log(` Server running on PORT ${process.env.PORT} `.bgBlue)
);
