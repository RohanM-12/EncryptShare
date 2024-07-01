const { randomBytes, createCipheriv } = require("crypto");
const { encrypt, decrypt } = require("../utils/AESCipher");
const fs = require("fs");
const uploadDocument = async (req, res) => {
  try {
    console.log("file", req.file);

    console.log("body", req.body);
    const key = randomBytes(32);
    const iv = randomBytes(16);
    console.log("key", key);
    // console.log("filebuffer", req.file.buffer);
    const Edata = await encrypt(req.file.buffer, key, iv);
    const Ddata = await decrypt(Edata, key, iv);
    const decryptedFileStream = fs.createWriteStream("decrypted_file.txt"); // Replace with your desired filename
    decryptedFileStream.write(Ddata);
    decryptedFileStream.end();
    return res.status(201).json({
      message: "success",
      //encrypted: Edata,
      decrypted: Ddata,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

module.exports = { uploadDocument };
