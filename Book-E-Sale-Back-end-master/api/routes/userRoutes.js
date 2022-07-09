const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //   console.log(firstName, lastName, email, password);
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      error: "Please Provide all the fields",
    });
  }
  User.findOne({ email: email })
    .then((alreadysaved) => {
      console.log(alreadysaved);
      if (alreadysaved) {
        return res.status(422).json({
          error: "User is already signed up",
        });
      }
      bcrypt.hash(password, 10).then((hashed) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashed,
        });
        user
          .save()
          .then((user) => {
            res.json({
              message: "user created successfully",
              createdUser: user,
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
    })
    .catch((err) => {
      res.status(505).json({
        error: err,
      });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    // .exec()
    .then((user) => {
      //   console.log(user);
      // if (user.length < 1) {
      //   return res.status(401).json({
      //     message: "Auth Failed",
      //   });
      // }
      if (!user) {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              emailId: user.email,
              userId: user._id,
            },
            JWT_SECRET
          );
          return res.status(200).json({
            // console.log("success"),
            message: "Auth Successfull",
            user: user,
            token: token,
          });
        }
        return res.status(401).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
