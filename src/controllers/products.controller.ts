import { Request, Response } from "express";

const getAllProducts = async (req: Request, res: Response) => {
  res.send("get all products");
};

const getProduct = async (req: Request, res: Response) => {
  res.send("get single product");
};

const createProduct = async (req: Request, res: Response) => {
  res.send("create product");
};
const updateProduct = async (req: Request, res: Response) => {
  res.send("update product");
};

const deleteProduct = async (req: Request, res: Response) => {
  res.send("delete product");
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
