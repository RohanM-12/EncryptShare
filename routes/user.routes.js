const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/signup", signupUser);

module.exports = { userRoutes };
