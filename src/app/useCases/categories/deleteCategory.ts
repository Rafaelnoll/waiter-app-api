import { Request, Response } from "express";
import { io } from "../../..";
import { Category } from "../../models/Category";

export async function deleteCategory(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const category = await Category.findByIdAndDelete(id);

		if (!category) {
			res.status(404);
			res.json({ msg: "Category not found!" });
			return;
		}

		io.emit("category@deleted", id);
		res.status(200);
		res.json({ msg: "Category deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
