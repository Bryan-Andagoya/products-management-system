import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PRODUCTS_PER_PAGE } from "../configs";
import { BadRequestError, NotFoundError } from "../errors";
import { Product } from "../models";
require("express-async-errors");

const getAllProducts = async (
  req: Request<any, any, any, { page: string }, any>,
  res: Response
) => {
  let page = parseInt(req.query.page);

  if (page === undefined) {
    page = 0;
  }

  if (page < 0) {
    throw new BadRequestError("Página inválida.");
  }

  const products = await Product.find({ isActive: true })
    .limit(20)
    .skip(PRODUCTS_PER_PAGE * page)
    .exec();

  const data = {
    count: products.length,
    page,
    products,
  };

  res.status(StatusCodes.OK).json(data);
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
