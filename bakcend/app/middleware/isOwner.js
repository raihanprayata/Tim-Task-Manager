const jwt = require("jsonwebtoken");

const isOwner = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({ error: "Owner only" });
  }
  next();
};

module.exports = isOwner;
