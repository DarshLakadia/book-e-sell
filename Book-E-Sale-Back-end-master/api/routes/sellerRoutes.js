const express = require("express");
const router = express.Router();
const Seller = require("../models/sellerModel");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../../config/keys");
const jwt = require("jsonwebtoken");

router.post("/order", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(422).json({ error: "Please provide id" });
  }
  Seller.findOne({ _id: id }).then((savedSeller) => {
    if (!savedSeller) {
      return res.status(422).json({ error: "Not able to find seller" });
    }

    const { order } = savedSeller;
    res.json({ order });
  });
});

router.put("/saveorder", (req, res) => {
  console.log(req.body);
  Seller.findByIdAndUpdate(
    req.body._id,
    {
      $push: { order: req.body.order },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      console.log("hi" + result);
      res.json(result);
    }
  });
});

router.put("/selectorder", (req, res) => {
  // console.log(req.body);
  Seller.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { order: req.body.order[0] },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      // console.log("hi" + result);
      res.json(result);
    }
  });
});
router.get("/allsellers", (req, res) => {
  Seller.find()
    .then((sellers) => {
      res.json({ sellers });
    })
    .catch((err) => {
      res.status(505).json({
        error: err,
      });
    });
});

router.post("/register", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      error: "Please Provide all the fields",
    });
  }
  Seller.findOne({ email: email })
    .then((alreadysaved) => {
      if (alreadysaved) {
        return res.status(422).json({
          error: "Seller is already signed up",
        });
      }
      bcrypt.hash(password, 10).then((hashed) => {
        const seller = new Seller({
          firstName,
          lastName,
          email,
          password: hashed,
        });
        seller
          .save()
          .then((seller) => {
            res.json({
              message: "seller created successfully",
              createdSeller: seller,
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

router.post("/sellerlogin", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  Seller.findOne({ email: email }).then((savedSeller) => {
    if (!savedSeller) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedSeller.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ message: "successfully signed in" });
          const token = jwt.sign({ _id: savedSeller._id }, JWT_SECRET);
          const { _id, firstName, lastName, email, password } = savedSeller;
          res.json({
            token,
            seller: { _id, firstName, lastName, email, password },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
