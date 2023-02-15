import { Request, Response } from "express";
import { io } from "../../..";

import { Product } from "../../models/Product";

export async function createProduct(req: Request, res: Response) {
	try {
		const imagePath = req.file?.filename;
		const { name, description, price, category, ingredients} = req.body;

		const product = await Product.create({
			name,
			description,
			imagePath,
			price: Number(price).toFixed(2),
			ingredients: ingredients ? JSON.parse(ingredients) : [],
			category,
		});

		io.emit("product@new", product);
		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
