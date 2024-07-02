const { randomBytes, createCipheriv } = require("crypto");
const { encrypt, decrypt } = require("../utils/AESCipher");
const fs = require("fs");
const { prisma } = require("../utils/DBConnect");
const File = require("../models/fileModel");
const { default: mongoose } = require("mongoose");
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
        ownerId: 1,
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

module.exports = { uploadDocument };
