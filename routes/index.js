const express = require("express");
const { userRoutes } = require("./user.routes");
const { docRoutes } = require("./document.routes");
const { validateUser } = require("../middlewares/authMiddleware");
const { logRoutes } = require("./log.routes");
const appRoutes = express.Router();

appRoutes.use("/api/v1/user", userRoutes);
appRoutes.use("/api/v1/document", validateUser, docRoutes);
appRoutes.use("/api/v1/logs", logRoutes);

module.exports = appRoutes;
