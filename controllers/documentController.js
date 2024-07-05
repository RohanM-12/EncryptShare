const { randomBytes, createCipheriv, publicEncrypt } = require("crypto");
const { encrypt, decrypt, decryptPrivateKey } = require("../utils/AESCipher");
const fs = require("fs");
const crypto = require("crypto");
const { prisma } = require("../utils/DBConnect");
require("dotenv").config();
const File = require("../models/fileModel");
const uploadDocument = async (req, res) => {
  try {
    console.log("file", req.file);
    console.log("body", req.body);
    const userKeyData = await prisma.UserKeys.findUnique({
      where: {
        userId: parseInt(req.body.ownerId),
      },
    });
    const key = randomBytes(32); // AES KEY this is
    const iv = randomBytes(16);
    console.log("key", key.toString("hex"));
    console.log("iv", iv.toString("hex"));
    // const publicKey = Buffer.from(userKeyData.publicKey, "base64");
    const publicKey = userKeyData.publicKey;
    const encryptedAESKey = publicEncrypt(publicKey, key).toString("hex");
    const encryptedData = encrypt(req.file.buffer, key, iv);
    // const decryptedFilename = decrypt(
    //   encryptedData,
    //   key,
    //   iv,
    //   req.file.originalname
    // );
    const mongoData = await File.create({
      content: encryptedData,
    });
    const savedMetaData = await prisma.file.create({
      data: {
        mongoId: mongoData._id.toString(),
        name: req.body.FileName || req.file.originalname,
        size: req.file.size.toString(),
        ownerId: parseInt(req.body.ownerId),
        initializationVector: iv.toString("hex"),
      },
    });
    await prisma.accessList.create({
      data: {
        fileId: savedMetaData.id,
        userId: parseInt(req.body.ownerId),
        encryptedKey: encryptedAESKey,
      },
    });
    //console.log("Decrypted Filename:", decryptedFilename);
    return res.status(201).json({
      message: "success",
      // encrypted: encryptedData,
      //     decrypted: decryptedFilename,
      savedMetaData,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};
const getDocuments = async (req, res) => {
  try {
    console.log(req.query);

    const allDocs = await prisma.file.findMany({
      where: {
        ownerId: parseInt(req.query.userId),
      },
    });

    //delete allDocs.initializationVector;

    return res.status(200).json({
      message: "success",
      data: allDocs,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { mongoId, id } = req.query;
    const deleteMongoData = await File.deleteOne({ _id: mongoId });
    if (!deleteMongoData) {
      return res.status(400).json({
        message: "error deleting encrpyted data",
      });
    }
    const deleteMetaData = await prisma.file.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!deleteMetaData) {
      return res.status(400).json({
        message: "error deleting metadata",
      });
    }
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

function getMimeType(filename) {
  const extension = filename.split(".").pop().toLowerCase();
  const mimeTypes = {
    txt: "text/plain",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    // Add more MIME types as needed
  };
  return mimeTypes[extension] || "application/octet-stream";
}
const downloadDocument = async (req, res) => {
  try {
    const { mongoId, id, userId } = req.query;
    const fileMetaData = await prisma.file.findUnique({
      where: { id: parseInt(id) },
      include: { accessList: true },
    });

    if (!fileMetaData) {
      return res.status(404).json({ message: "File not found" });
    }
    const userAccess = fileMetaData.accessList.find(
      (access) => access.userId === parseInt(userId)
    );

    if (!userAccess) {
      return res.status(403).json({
        message:
          "What are you tryna do BRUH ? like really? you have no access to this file",
      });
    }
    const encryptedFileContent = await File.findById({ _id: mongoId });

    if (!encryptedFileContent) {
      return res.status(404).json({ message: "File content not found" });
    }
    const userKeyData = await prisma.UserKeys.findUnique({
      where: { userId: parseInt(userId) },
    });
    const encryptedPrivateKey = userKeyData.privateKey;
    const iv = Buffer.from(userKeyData.iv, "hex");

    const privateKey = await decryptPrivateKey(
      encryptedPrivateKey,
      process.env.MASTER_KEY
    );
    //  console.log("priv key dec", privateKey);
    const encryptedAESKey = Buffer.from(userAccess.encryptedKey, "hex");
    const aesKey = crypto.privateDecrypt(privateKey, encryptedAESKey);

    const fileIV = Buffer.from(fileMetaData.initializationVector, "hex");

    if (fileIV.length !== 16) {
      throw new Error("Invalid IV length");
    }

    const decryptedFilename = decrypt(
      encryptedFileContent.content,
      aesKey,
      fileIV,
      fileMetaData.name
    );
    const filePath = `../EncryptShare/decFiles/${decryptedFilename}`;

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileMetaData.name}"`
    );
    res.setHeader("Content-Type", getMimeType(fileMetaData.name));

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on("close", () => {
      // cleaninng the server file not needed now
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Unlink file error:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};
module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument,
  downloadDocument,
};
