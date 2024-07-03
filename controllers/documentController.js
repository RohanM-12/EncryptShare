const { randomBytes, createCipheriv } = require("crypto");
const { encrypt, decrypt } = require("../utils/AESCipher");
const fs = require("fs");
const { prisma } = require("../utils/DBConnect");
const File = require("../models/fileModel");
const uploadDocument = async (req, res) => {
  try {
    console.log("file", req.file);
    console.log("body", req.body);

    const key = randomBytes(32);
    const iv = randomBytes(16);
    console.log("key", key.toString("hex"));
    console.log("iv", iv.toString("hex"));

    const encryptedData = encrypt(req.file.buffer, key, iv);
    const decryptedFilename = decrypt(
      encryptedData,
      key,
      iv,
      req.file.originalname
    );
    const mongoData = await File.create({
      content: encryptedData,
    });
    const savedMetaData = await prisma.file.create({
      data: {
        mongoId: mongoData._id.toString(),
        name: req.file.originalname,
        size: req.file.size.toString(),
        ownerId: parseInt(req.body.ownerId),
        initializationVector: iv.toString("hex"),
      },
    });
    console.log("Decrypted Filename:", decryptedFilename);
    return res.status(201).json({
      message: "success",
      // encrypted: encryptedData,
      decrypted: decryptedFilename,
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

const downloadDocument = async (req, res) => {
  try {
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
