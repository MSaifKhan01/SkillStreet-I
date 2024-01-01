const express = require("express");

const jwt = require("jsonwebtoken");


const bcrypt=require("bcrypt");
const UserModel = require("../Models/User");

const userRouter = express.Router();
require("dotenv").config()

userRouter.post("/Signup", async (req, res) => {
  const { email, phoneNumber, name, password } = req.body;
  try {
    if (!email && !phoneNumber) {
      return res
        .status(400)
        .send("You need to provide at least email or phoneNumber, or both");
    }
    const userFind = await UserModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (userFind) {
      return res
        .status(409)
        .send("User already exists. Please login directly.");
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const NewUser = new UserModel({
      email,
      phoneNumber,
      name,
      password: hashedPassword,
    });

    await NewUser.save();

    res.status(201).send("you Are Registered Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.post("/Login", async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    if (!(email || phoneNumber)) {
      return res
        .status(400)
        .send("You need to provide at least email or phoneNumber,");
    }

    if (!password) {
      return res.status(400).send("You need to provide password");
    }

    let query = {};
    if (email) {
      query.email = email;
    } else {
      query.phoneNumber = phoneNumber;
    }

    const UserPresent = await UserModel.findOne(query);
    // UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
    if (UserPresent) {
      bcrypt.compare(password, UserPresent.password, (err, result) => {
        if (result) {
          const Token = jwt.sign(
            { userID: UserPresent._id },
            process.env.JWT_Secret,
            { expiresIn: "3h" }
          );

          return res
            .status(201)
            .send({
              msg: "login succesfully",
              name: UserPresent.name,
              UserPresent,
              token: Token,
            });
        } else {
          return res.status(400).send("password not matched");
        }
      });
    } else {
      return res.status(404).send("You need to SignUp First");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports={
    userRouter
}