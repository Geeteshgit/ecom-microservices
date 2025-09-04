import express from "express";
import { addProduct, getAllProducts, getProductById } from "../controllers/product.controller.js";
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);

export default router;