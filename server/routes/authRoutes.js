const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/authControllers");
const { authenticateUser } = require("../Middlewares/authentication");

router.post("/signup", AuthControllers.registerNewUser);

router.post("/login", AuthControllers.loginUser);

router.get("/users", AuthControllers.getUsers);

router.get(
  "/users/:userId/parcels",
  authenticateUser,
  AuthControllers.fetchAllOrdersByUser
);

module.exports = router;
