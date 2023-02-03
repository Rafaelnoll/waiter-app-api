import { Request, Response } from "express";
import { io } from "../../..";
import { Order } from "../../models/Order";

export async function createOrder(req: Request, res: Response) {
	try {
		const { table, products } = req.body;

		const order = await Order.create({ table, products });
		const orderDetails = await order.populate("products.product");

		io.emit("order@new", orderDetails);
		res.status(201);
		res.json(order);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal server error!",
		});
	}
}
