import { Router } from "express";
const router = Router();

import { createIngredient } from "../useCases/ingredients/createIngredient";
import { deleteIngredient } from "../useCases/ingredients/deleteIngredient";
import { findIngredientById } from "../useCases/ingredients/findIngredientById";
import { listIngredients } from "../useCases/ingredients/listIngredients";
import { updateIngredient } from "../useCases/ingredients/updateIngredient";

// create a ingredient
router.post("/ingredients", createIngredient);

// find all ingredients
router.get("/ingredients", listIngredients);

// delete a ingredient
router.delete("/ingredients/:id", deleteIngredient);

// find all ingredients
router.get("/ingredients", listIngredients);

// update a ingredient
router.patch("/ingredients/:id", updateIngredient);

// find a ingridient by id
router.get("/ingredients/:id", findIngredientById);

export default router;
