const { DataTypes } = require("sequelize");
const sequelize = require("../../../utils/config.js");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    authId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "auth",
        key: "id",
      },
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

module.exports = User;
