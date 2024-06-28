const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doesExist = await UserModel.findOne({ email });
    console.log(doesExist);
    if (!doesExist) {
      return res.status(403).json({
        message: "user not registered, please register to login",
      });
    }

    if (
      doesExist.email === email &&
      (await bcrypt.compare(password, doesExist.password))
    ) {
      const userObject = doesExist.toObject();
      delete userObject.password;
      return res.status(200).json({
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
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.status(409).json({
        message: `User already registered with email ${email}`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await UserModel.create({
      name: userName,
      password: hashedPassword,
      email: email,
    });
    return res.status(201).json({
      status: "success",
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
