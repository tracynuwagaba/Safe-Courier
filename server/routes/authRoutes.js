const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/authControllers");
const { authenticateUser } = require("../Middlewares/authentication");

router.post("/signup", AuthControllers.registerNewUser);

// @route   POST api/auth/login
// @desc    Auth user (user, admin) and get token
// @access  Public
router.post("/login", AuthControllers.loginUser);

router.get("/users", AuthControllers.getUsers);

router.get(
  "/users/:userId/parcels",
  authenticateUser,
  AuthControllers.fetchAllOrdersByUser
);

module.exports = router;
