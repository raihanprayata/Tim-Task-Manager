const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  updateUser,
  updateRole,
  deleteUser,
} = require("./controller.js");
const authenticate = require("../../../middleware/authentication.js");
const isAdmin = require("../../../middleware/isAdmin.js");

router.get("/users", getAllUser);
router.get("/user/id/:id", authenticate, getUserById);
router.put("/user/edit/:id", authenticate, updateUser);
router.put("/user/edit-role/:id", authenticate, isAdmin, updateRole);
router.delete("/user/delete/:id", authenticate, deleteUser);

module.exports = router;
