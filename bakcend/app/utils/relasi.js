const Auth = require("../api/v1/auth/model.js");
const User = require("../api/v1/users/model.js");
const Project = require("../api/v1/projects/model.js");
const ProjectMember = require("../api/v1/project_member/model.js");
const Task = require("../api/v1/tasks/model.js");

// 0. Auth dan User
Auth.hasOne(User, { foreignKey: "authId", as: "userDetail" });
User.belongsTo(Auth, { foreignKey: "authId", as: "userDetail" });

// 1. User (pemilik project)
User.hasMany(Project, { foreignKey: "ownerId", as: "ownedProjects" });
Project.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// 2. User <-> Project (anggota proyek via project_member)
User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: "userId",
  otherKey: "projectId",
  as: "joinedProjects",
});
Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: "projectId",
  otherKey: "userId",
  as: "members",
});

// 3. Project memiliki banyak task
Project.hasMany(Task, { foreignKey: "projectId", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

// 4. Task dimiliki oleh satu user (assignedTo)
User.hasMany(Task, { foreignKey: "assignedTo", as: "assignedTasks" });
Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });

module.exports = {
  User,
  Project,
  ProjectMember,
  Task,
};
