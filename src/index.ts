import path from "node:path";
import http from "node:http";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";

import { router } from "./routes";

const PORT = 3001;
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect("mongodb://localhost:27017")
	.then(() => {
		app.emit("ready");
		console.log("Connected with mongo");
	})
	.catch(() => console.log("Error to connect with mongo"));

app.on("ready", () => {

	io.on("connect", () => {
		console.log("conectado com cliente");
	});

	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Headers", "*");
		res.setHeader("Access-Control-Allow-Methods", "*");
		next();
	});
	app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use(router);

	server.listen(PORT, () => {
		console.log(`🚀 Server is running on http://localhost:${PORT}`);
	});
});
