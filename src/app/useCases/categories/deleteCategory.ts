import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function deleteCategory(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const product = await Category.findByIdAndDelete(id);

		if (!product) {
			res.status(404);
			res.json({ msg: "Category not found!" });
			return;
		}
		res.status(200);
		res.json({ msg: "Category deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
