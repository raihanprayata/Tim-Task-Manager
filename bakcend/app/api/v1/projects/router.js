const express = require("express");
const router = express.Router();
const {
  getAllProject,
  getProjectWithOwner,
  getProjectsWithMembers,
  getProjectById,
  getProjectByUser,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
  removeMemberFromProject,
  searchProjects,
} = require("./controller.js");
const authenticate = require("../../../middleware/authentication.js");

router.get("/project", authenticate, getAllProject);
router.get("/owner", authenticate, getProjectWithOwner);
router.get("/members", authenticate, getProjectsWithMembers);
router.get("/project/:id", authenticate, getProjectById);
router.get("/project/user", authenticate, getProjectByUser);
router.get("/search", authenticate, searchProjects);

router.post("/project", authenticate, createProject);
router.put("/project/edit/:id", authenticate, updateProject);
router.delete("/project/delete/:id", authenticate, deleteProject);

// Manage members in project
router.post("/:projectId/add-member", authenticate, addMemberToProject);
router.delete(
  "/:projectId/remove-member",
  authenticate,
  removeMemberFromProject
);

module.exports = router;
