const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const expiry = 3600;
const { v4: uuidv4 } = require("uuid");

let users = [];

exports.registerNewUser = (req, res) => {
  // check if a user with this email exists
  const existingUser = users.find((user) => user.email === req.body.email);
  if (existingUser) {
    return res.status(400).json({ message: "email exists already" });
  } else {
    // create a new user
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    // push new user to the users array
    users.push({ ...user, id: uuidv4() });

    //   hash user's password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ err });
      }
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ err });
        }
        //   save password
        user.password = hashedPassword;
        // create jwt for user
        jwt.sign(
          {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
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
              .json({ message: "user registration successful", token, users });
          }
        );
      });
    });
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "email is invalid" });
  }
  let match = bcrypt.compare(password, user.password, (err, match) => {
    if (err) {
      return res.status(500).json({ err });
    } else if (match == false) {
      return res.status(401).json({ message: "incorrect password" });
    } else {
      // create a token
      jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        secret,
        { expiresIn: expiry },
        (err, token) => {
          if (err) {
            return res.status(500).json({ err });
          }
          return res.status(200).json({ message: "user logged in", token });
        }
      );
    }
  });
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
