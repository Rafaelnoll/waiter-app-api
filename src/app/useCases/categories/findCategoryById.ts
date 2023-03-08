import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function findCategoryById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const categories = await Category.findById(id);
		res.json(categories);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
