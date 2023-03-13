import { Request, Response } from "express";
import { io } from "../../..";
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

		const category = await Category.findByIdAndUpdate(id, updatedCategory);

		if (!category) {
			res.status(404);
			res.json({ msg: "Category not found!" });
			return;
		}

		const modifiedCategory = Object.assign(category, updatedCategory);

		io.emit("category@updated", modifiedCategory);
		res.status(200);
		res.json({ msg: "Category updated!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
