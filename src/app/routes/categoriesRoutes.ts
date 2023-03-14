import { Router } from "express";
const router = Router();

import { createCategory } from "../useCases/categories/createCategory";
import { deleteCategory } from "../useCases/categories/deleteCategory";
import { findCategoryById } from "../useCases/categories/findCategoryById";
import { listCategories } from "../useCases/categories/listCategories";
import { updateCategory } from "../useCases/categories/updateCategory";


// List categories
router.get("/categories", listCategories);

// Find Category By Id
router.get("/categories/:id", findCategoryById);

// Find Category By Id and update
router.patch("/categories/:id", updateCategory);

// Find Category By Id and delete
router.delete("/categories/:id", deleteCategory);

// Create category
router.post("/categories", createCategory);

export default router;
