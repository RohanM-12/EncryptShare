const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("decode", decode);
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { validateUser };
