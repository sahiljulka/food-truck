import { validationResult } from "express-validator";
import { HTTPStatusCode } from "../constants/constants";

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any[] = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(HTTPStatusCode.BAD_REQUEST).json({
    errors: extractedErrors,
  });
};
