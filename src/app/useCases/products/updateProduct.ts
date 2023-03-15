import { Request, Response } from "express";
import { io } from "../../..";
import { Product as TypeProduct } from "../../../types/Product";
import { Product } from "../../models/Product";

export async function updateProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { name, description, price, category, ingredients } = req.body;

		const updatedProduct: Partial<TypeProduct> = {};

		if (name) {
			updatedProduct.name = name;
		}
		if (description) {
			updatedProduct.description = description;
		}
		if (price) {
			updatedProduct.price = price;
		}
		if (category) {
			updatedProduct.category = category;
		}
		if (ingredients) {
			updatedProduct.ingredients = JSON.parse(ingredients);
		}

		const product = await Product.findByIdAndUpdate(id, updatedProduct);

		if (!product) {
			res.status(404);
			res.json({ msg: "Product not found!" });
			return;
		}

		const modifiedProduct = Object.assign(product, updatedProduct);

		io.emit("product@updated", modifiedProduct);
		res.status(200);
		res.json({ msg: "Product updated!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
