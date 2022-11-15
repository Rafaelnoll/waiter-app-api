import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3001;

mongoose.connect("mongodb://localhost:27017")
	.then(() => {
		app.emit("ready");
		console.log("Connected with mongo");
	})
	.catch(() => console.log("Error to connect with mongo"));


app.on("ready", () => {
	app.listen(PORT, () => {
		console.log(`🚀 Server is running on http://localhost:${PORT}`);
	});
});
