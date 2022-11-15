import { Request, Response } from "express";

import { Category } from "../../models/Category";

export async function createCategory(req: Request, res: Response) {
	try {
		const { icon, name } = req.body;

		const category = await Category.create({
			icon,
			name,
		});

		res.send(category);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
