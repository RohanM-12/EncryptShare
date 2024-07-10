const express = require("express");
const { getFileLogs } = require("../controllers/logController");

const logRoutes = express.Router();

logRoutes.get("/getFileLogData", getFileLogs);

module.exports = { logRoutes };
