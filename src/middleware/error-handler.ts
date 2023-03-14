import { Request, Response, NextFunction } from "express";
import { HTTPStatusCode } from "../constants/constants";
import TechnicalError from "../errors/technical-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status =
    (err as TechnicalError).statuscode || HTTPStatusCode.INTERNAL_SERVER_ERROR;
  res.status(status);
  res.json(err.message);
};
