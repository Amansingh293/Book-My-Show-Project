const express = require("express");

const router = express.Router();

const User = require("../model/userModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(
        request.body.password,
        saltRounds
      );

      const newUser = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
      });

      await newUser.save();

      response
        .status(200)
        .send({ success: true, message: "User Created ! Please Login" });
    } else {
      response
        .status(403)
        .send({ success: false, message: "User Already Exists" });
    }

    return;
  } catch (err) {
    response
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
    console.log(err.message);
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      response
        .status(401)
        .send({ success: false, message: "No User Exists !! Please SignUp" });
      return;
    }

    const validPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!validPassword) {
      response.status(401).send({
        success: false,
        message: "Invalid Credentails",
      });
      return;
    }

    const jwtToken = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_KEY
    );

    response.status(200).send({
      success: true,
      message: "User Logged in",
      data: jwtToken,
    });
    return;
  } catch (err) {
    console.log(err.message);
    response.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/get-current-user", authMiddleware, async (request, response) => {

  try {
    // console.log(request.body.id);
    const user = await User.findById(request.body.id).select("-password");

    response.status(200).send({
      success: true,
      message: "details fetched successfully",
      data: user,
    });
  } catch (err) {
    response.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
