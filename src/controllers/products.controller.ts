import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import { Product } from "../models";
require("express-async-errors");

const getAllProducts = async (_: Request, res: Response) => {
  const products = await Product.find({ isActive: true }).exec();
  res.status(StatusCodes.OK).json(products);
};

const getProduct = async (req: Request<{ id: string }>, res: Response) => {
  const {
    params: { id },
  } = req;

  const product = await Product.findOne({ _id: id, isActive: true }).exec();

  if (!product) {
    throw new NotFoundError(`No existe ningún producto con el id ${id}`);
  }

  res.status(StatusCodes.OK).json(product);
};

const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
};
const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
  const {
    params: { id },
  } = req;

  const product = await Product.findOneAndUpdate(
    { _id: id, isActive: true },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).exec();

  if (!product) {
    throw new NotFoundError(`No existe ningún producto con el id ${id}`);
  }

  res.status(StatusCodes.OK).json(product);
};

const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  const {
    params: { id },
  } = req;

  const product = await Product.findOneAndUpdate(
    { _id: id, isActive: true },
    { isActive: false },
    { new: true, runValidators: true }
  ).exec();

  if (!product) {
    throw new NotFoundError(`No existe ningún producto con el id ${id}`);
  }

  res.status(StatusCodes.OK).json(product);
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
