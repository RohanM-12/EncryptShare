const express = require("express");
const {
  uploadDocument,
  getDocuments,
  deleteDocument,
  downloadDocument,
} = require("../controllers/documentController");
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
docRoutes.post("/upload", upload.single("file"), uploadDocument);
docRoutes.get("/getDocuments", getDocuments);
docRoutes.get("/downloadDocument", downloadDocument);
docRoutes.delete("/deleteDocument", deleteDocument);

module.exports = { docRoutes };
