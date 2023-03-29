"use strict";

const path = require("path");
const { DataTypes, Sequelize, ValidationError } = require("sequelize");

const sequelize = new Sequelize({
	dialect: "sqlite",
	logging: process.env.NODE_ENV !== "production" && console.log,
	storage: path.join(__dirname, "db.sqlite"),
});

const Message = sequelize.define("Message", {
	value: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = exports = { Message, ValidationError, sequelize };
