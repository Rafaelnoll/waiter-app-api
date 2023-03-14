import { Request, Response } from "express";
import { Ingredient } from "../../models/Ingredients";

export async function deleteIngredient(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const ingredient = await Ingredient.findByIdAndDelete(id);

		if (!ingredient) {
			res.status(404);
			res.json({ msg: "Ingredient not found!" });
			return;
		}

		res.status(200);
		res.json({ msg: "Ingredient deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
