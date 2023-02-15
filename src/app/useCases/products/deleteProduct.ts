import { Request, Response } from "express";
import { io } from "../../..";
import { Product } from "../../models/Product";
import fs from "fs";
import path from "node:path";

export async function deleteProduct(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			res.status(404);
			res.json({ msg: "Product not found!" });
			return;
		}

		const pathToImage = path.resolve(__dirname, "..", "..", "..", "..", "uploads", product?.imagePath);
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		fs.unlink(pathToImage, () => { });

		io.emit("product@deleted", id);
		res.status(200);
		res.json({ msg: "Product deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
