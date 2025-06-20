const { DataTypes } = require("sequelize");
const sequelize = require("../../../utils/config.js");

const auth = sequelize.define(
  "auth",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "member", "owner"),
      defaultValue: "member",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = auth;
