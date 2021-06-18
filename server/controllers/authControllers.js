const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();
const secret = process.env.SECRET;
const expiry = 3600;
const { v4: uuidv4 } = require("uuid");

exports.registerNewUser = (req, res) => {
  // check if a user with this email exists
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    } else if (existingUser) {
      return res
        .status(400)
        .json({ message: "a user with this email already exists" });
    }
    // create a new user
    User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
      },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ err });
        }
        // hash user's password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ err });
          }
          bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({ err });
            }
            // save password to database
            newUser.password = hashedPassword;
            newUser.save((err, savedUser) => {
              if (err) {
                return res.status(500).json({ err });
              }
              // create token for user
              jwt.sign(
                {
                  id: newUser._id,
                  email: newUser.email,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  userRole: newUser.userRole,
                },
                secret,
                { expiresIn: expiry },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ err });
                  }
                  // send token to user
                  return res
                    .status(200)
                    .json({ message: "user registration successful", token });
                }
              );
            });
          });
        });
      }
    );
  });
};

exports.loginUser = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // else destructure request body
  const { email, password } = req.body;

  try {
    // initialise user
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // else check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    // else there is a match, send token, payload and signed token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
      if (err) throw err;
      res.json({
        statusCode: 200,
        message: "Logged in successfully",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userRole: user.userRole,
          isUser: user.isUser,
          isAdmin: user.isAdmin,
        },
        token,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  // // check if user exists
  // const user = users.find((user) => user.email === email);
  // if (!user) {
  //   return res.status(401).json({ message: "email is invalid" });
  // }
  // let match = bcrypt.compare(password, user.password, (err, match) => {
  //   if (err) {
  //     return res.status(500).json({ err });
  //   } else if (match == false) {
  //     return res.status(401).json({ message: "incorrect password" });
  //   } else {
  //     // create a token
  //     jwt.sign(
  //       {
  //         id: user._id,
  //         email: user.email,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         role: user.role,
  //       },
  //       secret,
  //       { expiresIn: expiry },
  //       (err, token) => {
  //         if (err) {
  //           return res.status(500).json({ err });
  //         }
  //         return res.status(200).json({ message: "user logged in", token });
  //       }
  //     );
  //   }
  // });
};

exports.getLoggedInUser = async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.user.id).select("password");
    // return user
    res.status(200).json({ message: "User gotten successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
};

// get all parcel delivery orders
exports.fetchAllOrdersByUser = (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(401).json({ message: "user not found" });
  } else {
    return res.status(200).json({ orders });
  }
};

// get all users
exports.getUsers = (req, res) => {
  res.send(users);
};

// check if there is an admin account
exports.checkAdmin = () => {
  const { role } = req.body;

  const admin = users.find((user) => user.role === "admin");

  if (admin) {
    return "admin account already exists";
  }
  // if there is none, create an admin account
};
