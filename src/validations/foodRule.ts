import { check } from "express-validator";

enum FoodCreateKeys {
  NAME = "name",
  DATE = "date",
}

const stringErrorMessage = "Please provide a valid string";
const dateErrorMessage = "Please provide a valid Date";

const nameCheck = check(FoodCreateKeys.NAME)
  .bail()
  .isString()
  .isLength({ min: 1 })
  .withMessage(stringErrorMessage);

const nameCheckOptional = check(FoodCreateKeys.NAME)
  .bail()
  .optional()
  .isString()
  .isLength({ min: 1 })
  .withMessage(stringErrorMessage);

export const dateCheck = check(FoodCreateKeys.DATE)
  .bail()
  .isDate()
  .withMessage(dateErrorMessage);

const dateCheckOptional = check(FoodCreateKeys.DATE)
  .bail()
  .optional()
  .isDate()
  .withMessage(dateErrorMessage);

export const foodRule = [nameCheck, dateCheck];
export const foodModifyRule = [nameCheckOptional, dateCheckOptional];
