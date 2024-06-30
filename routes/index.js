const express = require("express");
const { userRoutes } = require("./user.routes");
const appRoutes = express.Router();

appRoutes.use("/api/v1/user", userRoutes);

module.exports = appRoutes;
