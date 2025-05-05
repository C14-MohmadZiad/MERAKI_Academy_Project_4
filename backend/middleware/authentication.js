
const jwt  = require("jsonwebtoken");
  const User = require("../models/user");
const authentication = (req, res, next) => {
  console.log("→ ENV JWT_SECRET:", process.env.JWT_SECRET);
  console.log("→ AUTH HEADER:", req.headers.authorization);

  try {
    // 1) check the heders
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    // 2) extract headers
    const token = req.headers.authorization.split(" ").pop();

    // 3)check token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "The token is invalid or expired",
        });
      }

      // 4) bring data
      User.findById(decoded.id)
        .select("-password")
        .populate('role','name permissions')
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          }

          req.user = user;
          next();
        })
        .catch(() => {
          res.status(500).json({
            success: false,
            message: "Server Error",
          });
        });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = authentication;
