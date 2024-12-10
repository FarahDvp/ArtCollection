const GenereteToken = require("../functions/GenerateToken");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    //--------------------------------------------------------------------------
    // Verify user by mail
    console.log("userName :", userName);
    console.log("password :", password);
    let user = await UserModel.findOne({ userName });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Please verify your username",
        success: false,
      });
    }
    //--------------------------------------------------------------------------
    // Verify user password
    const passMatch = await bcrypt.compare(password, user?.password);
    if (!passMatch) {
      return res.status(400).json({
        message: "Please verify your password",
        success: false,
      });
    }
    const token = GenereteToken.GenerateToken({ _id: user._id }, "2h");
    const refreshToken = GenereteToken.GenerateRefreshToken(
      { _id: user._id },
      "3000h"
    );

    return res.status(200).json({
      message: "Logged successfully",
      success: true,
      user,
      token,
      refreshToken,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const RefreshToken = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }
  const refreshToken = req.headers.authorization.replace("Bearer", "").trim();
  if (!refreshToken) {
    return res.status(403).json({ error: "Access denied,token missing!" });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ err: "RefreshToken expired ! " });
      }
      // find in DB
      console.log(user);
      delete user.iat;
      delete user.exp;
      const accessToken = GenereteToken.GenerateToken(user, "3600s");
      res.send({
        token: accessToken,
      });
    });
  }
};

module.exports = { Login, RefreshToken };
