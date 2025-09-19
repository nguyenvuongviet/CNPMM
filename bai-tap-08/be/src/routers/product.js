import express from "express";
import { productController } from "../controllers/product.js";

const productRouter = express.Router();

productRouter.get("/filter", productController.filterProducts);

export default productRouter;
