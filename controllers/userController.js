const { prisma } = require("../utils/DBConnect");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userObject = await prisma.user.findUnique({
      where: { email },
    });
    console.log(userObject);
    if (!userObject) {
      return res.status(403).json({
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
    console.log(req.body);
    const checkUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (checkUser) {
      return res.json({
        status: 409,
        message: `User already registered with email ${email}`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await prisma.user.create({
      data: { name: userName, password: hashedPassword, email: email },
    });
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

module.exports = { loginUser, signupUser };
