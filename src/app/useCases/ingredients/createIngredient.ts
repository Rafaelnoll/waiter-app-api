import { Request, Response } from "express";
import { Ingredient } from "../../models/Ingredients";
import { io } from "../../..";

export async function createIngredient(req: Request, res: Response) {
	try {
		const { icon, name } = req.body;

		const ingredient = await Ingredient.create({
			icon,
			name,
		});

		io.emit("ingredient@new", ingredient);
		res.status(201).json(ingredient);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
