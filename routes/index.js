const express = require("express");
const { userRoutes } = require("./user.routes");
const { docRoutes } = require("./document.routes");
const { validateUser } = require("../middlewares/authMiddleware");
const appRoutes = express.Router();

appRoutes.use("/api/v1/user", userRoutes);
appRoutes.use("/api/v1/document", validateUser, docRoutes);

module.exports = appRoutes;
