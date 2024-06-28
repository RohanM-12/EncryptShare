const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/login", loginUser);
userRoutes.post("/signup", signupUser);

module.exports = { userRoutes };
