const crypto = require("crypto");
require("dotenv").config();
const fs = require("fs");
// const encrypt = (file, key, iv) => {
//   try {
//     const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//     return Buffer.from(
//       cipher.update(file, "urf8", "hex") + cipher.final("hex")
//     ).toString("base64");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const decrypt = (encrpytedFile, key, iv) => {
//   try {
//     const buff = Buffer.from(encrpytedFile, "base64");
//     const decipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//     return (
//       decipher.update(buff.toString("utf8"), "hex", "utf8") +
//       decipher.final("utf8")
//     );
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const encrypt = (file, key, iv) => {
//   try {
//     const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//     return Buffer.from(
//       cipher.update(file, "binary", "hex") + cipher.final("hex")
//     ).toString("base64");
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// const decrypt = (encryptedFile, key, iv, originalFilename) => {
//   try {
//     const buff = Buffer.from(encryptedFile, "base64");
//     const decipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//     const decryptedData =
//       decipher.update(buff.toString("binary"), "hex", "binary") +
//       decipher.final("binary");

//     // Set file extension based on original filename (optional)
//     //const originalFilename = req.file.originalname; // Assuming you have access to the original filename
//     const fileExtension = originalFilename.split(".").pop();
//     const decryptedFilename = `decrypted.${fileExtension}`;

//     // Write the decrypted data to a file with the appropriate extension
//     fs.writeFileSync(decryptedFilename, decryptedData);

//     return decryptedFilename; // Return the filename for potential use (e.g., sending back to user)
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// module.exports = { encrypt, decrypt };

// Chat Gpt

const encrypt = (file, key, iv) => {
  try {
    const cipher = crypto.createCipheriv(process.env.ENC_METHOD, key, iv);
    const encryptedData = Buffer.concat([cipher.update(file), cipher.final()]);
    return encryptedData.toString("base64");
  } catch (error) {
    console.error(error.message);
  }
};

const decrypt = (encryptedFile, key, iv, originalFilename) => {
  try {
    const encryptedBuffer = Buffer.from(encryptedFile, "base64");
    const decipher = crypto.createDecipheriv(process.env.ENC_METHOD, key, iv);
    const decryptedData = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);

    const fileExtension = originalFilename.split(".").pop();
    const fileName = originalFilename.split(".").slice(0, -1).join(".");
    const decryptedFilename = `${fileName}.${fileExtension}`;
    const outputDir = "../EncryptShare/decFiles";
    const outputPath = `${outputDir}/${decryptedFilename}`;

    fs.writeFileSync(outputPath, decryptedData);

    return decryptedFilename;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { encrypt, decrypt };
