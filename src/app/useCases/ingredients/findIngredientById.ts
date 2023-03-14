import { Request, Response } from "express";
import { Ingredient } from "../../models/Ingredients";

export async function findIngredientById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const ingredients = await Ingredient.findById(id);
		res.json(ingredients);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
