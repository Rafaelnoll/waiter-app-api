import path from "node:path";

import { Router } from "express";
import multer from "multer";

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";
import { listOneProduct } from "./app/useCases/products/listOneProduct";
import { deleteProduct } from "./app/useCases/products/deleteProduct";
import { updateProduct } from "./app/useCases/products/updateProduct";
import { findCategoryById } from "./app/useCases/categories/findCategoryById";
import { updateCategory } from "./app/useCases/categories/updateCategory";

export const router = Router();

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, "..", "uploads"));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		}
	}),
});

// List categories
router.get("/categories", listCategories);

// Find Category By Id
router.get("/categories/:id", findCategoryById);

// Find Category By Id and update
router.patch("/categories/:id", updateCategory);

// Create category
router.post("/categories", createCategory);

// List products
router.get("/products", listProducts);

// List one product
router.get("/products/:id", listOneProduct);

// Delete one product
router.delete("/products/:id", deleteProduct);

// update one product
router.patch("/products/:id", updateProduct);

// Create products
router.post("/products", upload.single("image"), createProduct);

// Get products by category
router.get("/categories/:categoryId/products", listProductsByCategory);

// List orders
router.get("/orders", listOrders);

// Create order
router.post("/orders", createOrder);

// Change order status
router.patch("/orders/:orderId", changeOrderStatus);

// Delete/cancel order
router.delete("/orders/:orderId", cancelOrder);
