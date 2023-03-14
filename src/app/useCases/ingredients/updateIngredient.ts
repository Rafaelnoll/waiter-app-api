import { Request, Response } from "express";
import { io } from "../../..";
import { Ingredient as TypeIngredient } from "../../../types/Ingredient";
import { Ingredient } from "../../models/Ingredients";

export async function updateIngredient(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { icon, name } = req.body;

		const updatedIngredient: Partial<TypeIngredient> = {};

		if (name) {
			updatedIngredient.name = name;
		}
		if (icon) {
			updatedIngredient.icon = icon;
		}

		const ingredient = await Ingredient.findByIdAndUpdate(id, updatedIngredient);

		if (!ingredient) {
			res.status(404);
			res.json({ msg: "Ingredient not found!" });
			return;
		}

		const modifiedIngredient = Object.assign(ingredient, updatedIngredient);

		io.emit("ingredient@updated", modifiedIngredient);
		res.status(200);
		res.json({ msg: "Ingredient updated!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
