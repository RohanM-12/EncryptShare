const express = require("express");

const appRoutes = require("./routes");
const cors = require("cors");
const connectDB = require("./utils/DBConnect");
require("dotenv/config");
require("colors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(appRoutes);

//DB connection
connectDB(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database".bgWhite))
  .catch((error) => console.log(error.message));

app.listen(process.env.PORT, () =>
  console.log(` Server running on PORT ${process.env.PORT} `.bgBlue)
);
