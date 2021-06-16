const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/authControllers");
const auth = require("../Middlewares/authentication");

router.post("/signup", AuthControllers.registerNewUser);

router.post("/login", AuthControllers.loginUser);

router.get("/users", AuthControllers.getUsers);

module.exports = router;
