const express = require("express");
const {
  uploadDocument,
  getDocuments,
  deleteDocument,
  downloadDocument,
  shareDocument,
} = require("../controllers/documentController");
const multer = require("multer");
const { validateUser } = require("../middlewares/authMiddleware");
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
docRoutes.get("/download", downloadDocument);
docRoutes.delete("/deleteDocument", deleteDocument);
docRoutes.post("/shareDocument", shareDocument);

module.exports = { docRoutes };
