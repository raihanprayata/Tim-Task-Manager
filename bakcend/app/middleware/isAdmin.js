const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
};

module.exports = isAdmin;
