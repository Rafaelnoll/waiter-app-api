import path from "node:path";
import http from "node:http";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import categoriesRoutes from "./app/routes/categoriesRoutes";
import ingredientsRoutes from "./app/routes/ingredientsRoutes";
import ordersRoutes from "./app/routes/ordersRoutes";
import productsRoutes from "./app/routes/categoriesRoutes";

const PORT = 3001;
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect("mongodb://127.0.0.1:27017")
	.then(() => {
		app.emit("ready");
		console.log("Connected with mongo");
	})
	.catch((error) => {
		console.log(error);
		console.log("Error to connect with mongo");
	});

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

	// Routes
	app.use(categoriesRoutes);
	app.use(ingredientsRoutes);
	app.use(ordersRoutes);
	app.use(productsRoutes);

	server.listen(PORT, () => {
		console.log(`🚀 Server is running on http://localhost:${PORT}`);
	});
});
