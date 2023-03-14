import { Router } from "express";
const router = Router();

import categoriesRoutes from "./routes/categoriesRoutes";
import ingredientsRoutes from "./routes/ingredientsRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import productsRoutes from "./routes/productsRoutes";

router.use(ordersRoutes);
router.use(categoriesRoutes);
router.use(ingredientsRoutes);
router.use(productsRoutes);

export default router;
