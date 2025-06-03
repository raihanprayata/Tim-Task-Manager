const express = require("express");
const cors = require("cors");
// IMPORT ROUTER
const routerAuth = require("./app/api/v1/auth/router.js");
const routerUser = require("./app/api/v1/users/router.js");
const routerProject = require("./app/api/v1/projects/router.js");
const routerTask = require("./app/api/v1/tasks/router.js");

const app = express();
const paternApi = "/api/v1";

// ROUTE LEVELMIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
app.use(paternApi, routerAuth);
app.use(paternApi, routerUser);
app.use(paternApi, routerProject);
app.use(paternApi, routerTask);

// INISIALISASI TABEL DATABASE
const sequelize = require("./app/utils/config.js");
require("./app/utils/relasi.js");

sequelize.sync();

app.listen(3000, () => {
  console.log(`Server running...`);
});
