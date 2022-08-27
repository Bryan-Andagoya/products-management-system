import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors";
import { Error } from "mongoose";

interface CustomError extends CustomApiError {
  name: string;
  errors: Error.ValidationError["errors"];
  value: any;
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: CustomError,
  _,
  res,
  __
) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Algo salió mal, intentalo más tarde",
  };

  if (err.name === "ValidationError") {
    const validationErrors: { errors: { [key: string]: string } } = {
      errors: {},
    };
    const keys = Object.keys(err.errors);
    const values = Object.values(err.errors);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      validationErrors.errors[key] = values[i].message;
    }

    res.status(StatusCodes.BAD_REQUEST).json(validationErrors);
  }

  if (err.name === "CastError") {
    customError.message = `No existe ningún producto con el id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};
