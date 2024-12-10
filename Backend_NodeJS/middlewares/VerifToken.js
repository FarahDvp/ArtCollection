const jwt = require("jsonwebtoken");
const userModel = require("../models/User.model");

const isAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await userModel.findOne({ _id: decoded._id, role: "ADMIN" });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isSuperAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await userModel.findOne({
      _id: decoded._id,
      role: "SUPERADMIN",
    });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};
const isUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await userModel.findOne({
      _id: decoded._id,
    });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

module.exports = { isAdmin, isSuperAdmin, isUser };
