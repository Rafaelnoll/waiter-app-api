import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listOneProduct(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const product = await Product.findById(id);
		console.log(id);
		console.log(product);
		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
