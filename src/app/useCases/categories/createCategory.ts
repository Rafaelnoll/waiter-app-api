import { Request, Response } from "express";
import { io } from "../../..";

import { Category } from "../../models/Category";

export async function createCategory(req: Request, res: Response) {
	try {
		const { icon, name } = req.body;

		const category = await Category.create({
			icon,
			name,
		});

		io.emit("category@new", category);
		res.status(201).json(category);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
