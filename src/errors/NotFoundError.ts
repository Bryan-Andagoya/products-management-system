import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./CustomAPIError";

export class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
