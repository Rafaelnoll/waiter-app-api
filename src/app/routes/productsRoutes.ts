import { Router } from "express";
const router = Router();

import { listProductsByCategory } from "../useCases/categories/listProductsByCategory";
import { createProduct } from "../useCases/products/createProduct";
import { deleteProduct } from "../useCases/products/deleteProduct";
import { listOneProduct } from "../useCases/products/listOneProduct";
import { listProducts } from "../useCases/products/listProducts";
import { updateProduct } from "../useCases/products/updateProduct";
import { upload } from "../utils/upload";


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

export default router;
