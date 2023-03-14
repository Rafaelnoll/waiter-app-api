import { Router } from "express";
const router = Router();

import { cancelOrder } from "../useCases/orders/cancelOrder";
import { changeOrderStatus } from "../useCases/orders/changeOrderStatus";
import { createOrder } from "../useCases/orders/createOrder";
import { listOrders } from "../useCases/orders/listOrders";

// List orders
router.get("/orders", listOrders);

// Create order
router.post("/orders", createOrder);

// Change order status
router.patch("/orders/:orderId", changeOrderStatus);

// Delete/cancel order
router.delete("/orders/:orderId", cancelOrder);

export default router;
