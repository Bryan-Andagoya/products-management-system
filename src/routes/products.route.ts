import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers";

export const productsRouter = express.Router();

productsRouter.route("/").get(getAllProducts).post(createProduct);
productsRouter
  .route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);
