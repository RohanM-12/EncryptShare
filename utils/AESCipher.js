const crypto = require("crypto");
const encrypt = (file, key, iv) => {
  try {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    return Buffer.from(
      cipher.update(file, "urf8", "hex") + cipher.final("hex")
    ).toString("base64");
  } catch (error) {
    console.log(error.message);
  }
};

const decrypt = (encrpytedFile, key, iv) => {
  try {
    const buff = Buffer.from(encrpytedFile, "base64");
    const decipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    return (
      decipher.update(buff.toString("utf8"), "hex", "utf8") +
      decipher.final("utf8")
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { encrypt, decrypt };
