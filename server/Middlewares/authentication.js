const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.authenticateUser = (req, res, next) => {
  // check if there is an authorization token
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "authorization header required" });
  }
  let splittedHeader = req.header.authorization.split(" ");
  console.log(splittedHeader);
  if (splittedHeader[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "authorization format is Bearer <token>" });
  }
  let token = splittedHeader[1];
  //   decode token
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(500).json({ err });
    }
    //   check if valid
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "invalid authorization token, please login" });
    }
    // allow user to continue with the request
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  });
};

exports.checkIfAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "this role is resticted to admin users" });
  }
  return next();
};
