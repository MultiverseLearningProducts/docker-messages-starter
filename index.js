"use strict";

const express = require("express");
const { Message, ValidationError, sequelize } = require("./db");

const app = express();

app.set("json spaces", "\t");
app.use(express.json());

app.get("/", async (req, res, next) => {
	try {
		const messages = await Message.findAll();
		res.json(messages);
	} catch (err) {
		next(err);
		res.status(500).send();
	}
});

app.post("/", async (req, res, next) => {
	try {
		const message = await Message.create({ value: req.body.value });
		res.status(201).json(message);
	} catch (err) {
		next(err);
		const code = err instanceof ValidationError ? 400 : 500;
		res.status(code).send();
	}
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
	try {
		await sequelize.authenticate();
		console.log(`Listening on port ${port}`);
	} catch (err) {
		console.error(err);
	}
});
