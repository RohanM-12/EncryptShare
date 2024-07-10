const { randomBytes, createCipheriv, publicEncrypt } = require("crypto");
const { encrypt, decrypt, decryptPrivateKey } = require("../utils/AESCipher");
const fs = require("fs");
const requestIp = require("request-ip");
const crypto = require("crypto");
const { prisma } = require("../utils/DBConnect");
require("dotenv").config();
const File = require("../models/fileModel");
const uploadDocument = async (req, res) => {
  try {
    // console.log("file", req.file);
    // console.log("body", req.body);
    const userKeyData = await prisma.UserKeys.findUnique({
      where: {
        userId: parseInt(req.body.ownerId),
      },
    });
    const key = randomBytes(32); // AES KEY this is
    const iv = randomBytes(16);
    // console.log("key", key.toString("hex"));
    // console.log("iv", iv.toString("hex"));
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
    const userId = parseInt(req.query.userId);
    const searchText = req.query.searchText;

    let whereClause = {
      ownerId: userId,
    };

    if (searchText) {
      whereClause.name = {
        contains: searchText,
        mode: "insensitive",
      };
    }

    const allDocs = await prisma.file.findMany({
      where: whereClause,
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const result = allDocs.map((item) => {
      const { owner, ...restFile } = item;
      return {
        ...restFile,
        senderName: owner.name,
        senderEmail: owner.email,
      };
    });

    return res.status(200).json({
      message: "success",
      data: result,
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
  // ye uthaya chatgpt se 😁
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
    const encryptedAESKey = Buffer.from(userAccess.encryptedKey, "hex");
    const aesKey = crypto.privateDecrypt(privateKey, encryptedAESKey);

    const fileIV = Buffer.from(fileMetaData.initializationVector, "hex");

    if (fileIV.length !== 16) {
      throw new Error("Invalid IV length");
    }

    const encryptedBuffer = Buffer.from(encryptedFileContent.content, "base64");
    const decipher = crypto.createDecipheriv(
      process.env.ENC_METHOD,
      aesKey,
      fileIV
    );
    const decryptedData = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);
    // creating a log for the download OPERATIon
    const clientIP = requestIp.getClientIp(req).toString();
    const logData = await prisma.FileAccessLog.create({
      data: {
        userId: parseInt(userId),
        fileId: parseInt(id),
        action: "Downloaded",
        ipAddr: clientIP,
      },
    });
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileMetaData.name}"`
    );
    res.setHeader("Content-Type", getMimeType(fileMetaData.name));

    res.end(decryptedData);
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

const shareDocument = async (req, res) => {
  try {
    // ----------------- PLAN for further implementation of file share (bhai koi chori mt kro code ki please) ---------------
    //     // grab private key for owner of the file from userSchema
    //     // decrypt the private key of owner using master secret
    //     // grab the encrpyted aes key for the file from access list associated with the owner
    //     // decrpyt the aes key using owners private key
    //     // grab the shared users private key
    //     // decrpyt the shared uesrs private key usign master key
    //     // now encrypt the aes key using the above decrpyted private key
    //     // now save the aes key and userID in accessList

    const { userData, fileId, ownerId } = req.body;
    console.log("body", req.body);

    const ownerKeyData = await prisma.UserKeys.findUnique({
      where: { userId: parseInt(ownerId) },
    });
    if (!ownerKeyData) throw new Error("Owner private key not found");

    const decryptedPrivKeyOwner = decryptPrivateKey(
      ownerKeyData.privateKey,
      process.env.MASTER_KEY
    );
    const accessListEntry = await prisma.accessList.findFirst({
      where: { userId: parseInt(ownerId), fileId: parseInt(fileId) },
    });
    if (!accessListEntry) throw new Error("Access record not found");

    const decryptedAESKeyOwner = crypto.privateDecrypt(
      {
        key: decryptedPrivKeyOwner,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(accessListEntry.encryptedKey, "hex")
    );

    const sharedUserKeyData = await prisma.UserKeys.findUnique({
      where: { userId: parseInt(userData.id) },
    });
    if (!sharedUserKeyData) throw new Error("Shared user keys not found");

    const decryptedSharedUserPrivKey = decryptPrivateKey(
      sharedUserKeyData.privateKey,
      process.env.MASTER_KEY
    );
    const sharedUserEncryptedAESKey = crypto.publicEncrypt(
      {
        key: decryptedSharedUserPrivKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      decryptedAESKeyOwner
    );

    const result = await prisma.accessList.create({
      data: {
        userId: parseInt(userData.id),
        fileId: parseInt(fileId),
        encryptedKey: sharedUserEncryptedAESKey.toString("hex"),
      },
    });

    /// insert user access log for sharing
    const clientIP = requestIp.getClientIp(req).toString();
    const logData = await prisma.FileAccessLog.create({
      data: {
        userId: parseInt(ownerId),
        fileId: parseInt(fileId),
        action: "Shared",
        ipAddr: clientIP,
      },
    });

    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

const getFileUesrAccessList = async (req, res) => {
  try {
    const { fileId } = req.query;
    const data = await prisma.accessList.findMany({
      where: { fileId: parseInt(fileId) },

      include: {
        user: {
          // lowercase `user`
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const userData = data?.map((item) => item.user);
    return res.status(200).json({
      message: "success",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};
const roverUserAccess = async (req, res) => {
  try {
    const { fileId, userId } = req.body;
    const data = await prisma.accessList.delete({
      where: {
        fileId_userId: {
          fileId: parseInt(fileId),
          userId: parseInt(userId),
        },
      },
    });
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};
const removeAllUserAccess = async (req, res) => {
  try {
    const { fileId, ownerId } = req.body;
    const result = await prisma.accessList.deleteMany({
      where: {
        fileId: parseInt(fileId),
        NOT: {
          userId: parseInt(ownerId),
        },
      },
    });
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};
const getSharedDocuments = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    const searchText = req.query.searchText;

    let whereClause = {
      userId: userId,
      file: {
        ownerId: { not: userId },
      },
    };

    if (searchText) {
      whereClause.file.name = {
        contains: searchText,
        mode: "insensitive",
      };
    }

    const accessListData = await prisma.accessList.findMany({
      where: whereClause,
      include: {
        file: {
          include: {
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const responseData = accessListData.map((item) => ({
      id: item.file.id,
      mongoId: item.file.mongoId,
      name: item.file.name,
      size: item.file.size,
      initializationVector: item.file.initializationVector,
      sharedDateTime: item.sharedDateTime,
      senderName: item.file.owner.name,
      senderEmail: item.file.owner.email,
    }));

    return res.status(200).json({
      message: "success",
      status: 200,
      data: responseData,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

const searchDocument = async (req, res) => {
  try {
    const { searchText, shared } = req.query;
    console.log(req.query);
    const userId = parseInt(req.query.userId);
    // grab the users khudke documents
    if (shared == "true") {
      const sharedDocumentsData = await prisma.accessList.findMany({
        where: {
          userId: userId,
          file: {
            name: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        },
        include: {
          file: {
            include: {
              owner: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
      const sharedDocuments = sharedDocumentsData.map((item) => {
        const { ...restData } = item;
        const { owner, ...restFile } = item.file;
        return {
          ...restFile,
          senderName: owner.name,
          senderEmail: owner.email,
          sharedDateTime: item.sharedDateTime,
        };
      });
      return res.status(200).json({
        message: "success",
        data: sharedDocuments,
      });
    } else {
      const uploadedDocument = await prisma.file.findMany({
        where: {
          ownerId: userId,
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        include: {
          owner: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      const result = uploadedDocument.map((item) => {
        const { owner, ...restFile } = item;
        return {
          ...restFile,
          senderName: owner.name,
          senderEmail: owner.email,
        };
      });
      return res.status(200).json({
        message: "success",
        data: result,
      });
    }

    //now we grab the shared documents

    // const allDocuments = [...uploadedDocument, ...sharedDocuments];
    // const result = allDocuments.map((item) => {
    //   const { owner, ...restData } = item;
    //   return { ...restData, senderName: owner.name, senderEmail: owner.email };
    // });
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
  shareDocument,
  getFileUesrAccessList,
  roverUserAccess,
  removeAllUserAccess,
  getSharedDocuments,
  searchDocument,
};
