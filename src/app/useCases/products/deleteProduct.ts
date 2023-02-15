import { Request, Response } from "express";
import { io } from "../../..";
import { Product } from "../../models/Product";

export async function deleteProduct(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const product = await Product.findByIdAndDelete(id);

		io.emit("product@deleted", id);
		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
