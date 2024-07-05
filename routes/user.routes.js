const express = require("express");
const {
  loginUser,
  signupUser,
  getAllUsers,
  searchUser,
} = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/signup", signupUser);
userRoutes.get("/getAllUsers", getAllUsers);
userRoutes.get("/searchUser", searchUser);

module.exports = { userRoutes };
