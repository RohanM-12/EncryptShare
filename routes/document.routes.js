const express = require("express");
const { uploadDocument } = require("../controllers/documentController");
const multer = require("multer");
const docRoutes = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
docRoutes.post("/upload", upload.single("testImg"), uploadDocument);

module.exports = { docRoutes };
