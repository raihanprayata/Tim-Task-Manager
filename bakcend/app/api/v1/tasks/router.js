const express = require("express");
const router = express.Router();
const {
  getAllTask,
  getTaskById,
  getTaskByProject,
  getTaskByStatus,
  getTaskByAssignedTo,
  createTask,
  updateTask,
  filterTaskByUser,
  updateTaskStatus,
  deleteTask,
} = require("./controller.js");
const authenticate = require("../../../middleware/authentication.js");

router.get("/task", getAllTask);
router.get("/task/id/:id", authenticate, getTaskById);
router.get("/task/project/:projectId", authenticate, getTaskByProject);
router.get("/task/status/:status", authenticate, getTaskByStatus);
router.get("/task/user/:userId", authenticate, filterTaskByUser);
router.get("/task/member/:userId", authenticate, getTaskByAssignedTo);

router.post("/task/create", authenticate, createTask);
router.put("/task/edit/:id", authenticate, updateTask);
router.put("/task/:id/status", authenticate, updateTaskStatus);
router.delete("/task/delete/:id", authenticate, deleteTask);

module.exports = router;
