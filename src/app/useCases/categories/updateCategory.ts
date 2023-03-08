import { Request, Response } from "express";
import { Category as TypeCategory } from "../../../types/Category";
import { Category } from "../../models/Category";

export async function updateCategory(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { icon, name } = req.body;

		const updatedCategory: Partial<TypeCategory> = {};

		if (name) {
			updatedCategory.name = name;
		}
		if (icon) {
			updatedCategory.icon = icon;
		}

		const product = await Category.findByIdAndUpdate(id, updatedCategory);

		if (!product) {
			res.status(404);
			res.json({ msg: "Category not found!" });
			return;
		}

		res.status(200);
		res.json({ msg: "Category updated!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
