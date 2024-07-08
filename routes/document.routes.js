const express = require("express");
const {
  uploadDocument,
  getDocuments,
  deleteDocument,
  downloadDocument,
  shareDocument,
  getFileUesrAccessList,
  roverUserAccess,
  removeAllUserAccess,
  getSharedDocuments,
  searchDocument,
} = require("../controllers/documentController");
const multer = require("multer");
const { validateUser } = require("../middlewares/authMiddleware");
const docRoutes = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
docRoutes.post("/upload", upload.single("file"), uploadDocument);
docRoutes.get("/getDocuments", getDocuments);
docRoutes.get("/download", downloadDocument);
docRoutes.delete("/deleteDocument", deleteDocument);
docRoutes.post("/shareDocument", shareDocument);
docRoutes.get("/getFileUserAccessList", getFileUesrAccessList);
docRoutes.put("/removeUserAccess", roverUserAccess);
docRoutes.put("/removeAllUserAccess", removeAllUserAccess);
docRoutes.get("/getSharedDocuments", getSharedDocuments);
docRoutes.get("/searchDocuments", searchDocument);
module.exports = { docRoutes };
