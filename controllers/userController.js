const { prisma } = require("../utils/DBConnect");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");
const { generateKeyPair, encryptPrivateKey } = require("../utils/AESCipher");
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userObject = await prisma.user.findUnique({
      where: { email },
    });
    if (!userObject) {
      return res.json({
        status: 403,
        message: "user not registered, please register to login",
      });
    }

    if (
      userObject.email === email &&
      (await bcrypt.compare(password, userObject.password))
    ) {
      const token = jwt.sign({ userObject }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      delete userObject.password;
      return res.status(200).json({
        status: 200,
        token,
        message: "success",
        data: { ...userObject },
      });
    }
    return res.json({
      status: 403,
      message: "Email or password is incorrect",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
const signupUser = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const checkUser = await prisma.User.findUnique({
      where: { email: email },
    });
    if (checkUser) {
      return res.json({
        status: 409,
        message: `User already registered with email ${email}`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userData = await prisma.User.create({
      data: { name: userName, password: hashedPassword, email: email },
    });
    console.log(userData);
    if (userData) {
      const { publicKey, privateKey } = await generateKeyPair();
      // console.log(privateKey, publicKey);
      const iv = crypto.randomBytes(16);
      const encryptedPrivateKey = encryptPrivateKey(
        privateKey,
        process.env.MASTER_KEY,
        iv
      );

      const res = await prisma.UserKeys.create({
        data: {
          userId: userData.id,
          publicKey: publicKey,
          privateKey: encryptedPrivateKey,
          iv: iv.toString("hex"),
        },
      });
    }
    return res.status(201).json({
      status: 201,
      user: { email },
      message: "new user registered",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { currLen, loadLen, userId } = req.query;
    const userList = await prisma.user.findMany({
      skip: parseInt(currLen),
      take: parseInt(loadLen),
      where: {
        id: {
          not: parseInt(userId),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(200).json({
      message: "success",
      data: userList,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const { searchText } = req.query;

    const userList = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchText, mode: "insensitive" } },
          { email: { contains: searchText, mode: "insensitive" } },
        ],
      },
      take: 5,
    });
    const fileteredUsers = userList?.map((user) => {
      return { ...user, password: null };
    });
    return res.status(200).json({
      message: "success",
      data: fileteredUsers,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: error.message,
    });
  }
};
module.exports = { loginUser, signupUser, getAllUsers, searchUser };
