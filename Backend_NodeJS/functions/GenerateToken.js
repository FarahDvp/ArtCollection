const jwt = require("jsonwebtoken");

const GenerateToken = (data, duration) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: duration,
  });
};

const GenerateRefreshToken = (data, duration) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: duration,
  });
};
module.exports = { GenerateRefreshToken, GenerateToken };
