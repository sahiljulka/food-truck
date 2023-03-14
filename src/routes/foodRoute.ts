import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatusCode } from "../constants/constants";
import FoodTruckDTO from "../dto/foodTruckDto";
import { validate } from "../middleware/validate-request";
import foodService from "../services/foodService";
import { dateCheck, foodModifyRule, foodRule } from "../validations/foodRule";

export const foodRoute = Router();

foodRoute.post(
  "/",
  foodRule,
  validate,
  asyncHandler(async (req, res): Promise<void> => {
    const id = await foodService.storeFoodTruck(req.body);
    res.status(HTTPStatusCode.CREATED).json({ id });
  })
);

foodRoute.get(
  "/",
  dateCheck,
  validate,
  asyncHandler(async (req, res): Promise<void> => {
    const foodTrucks: FoodTruckDTO[] = await foodService.getFoodTrucksFor(
      req.query?.date as unknown as Date
    );
    res.json(foodTrucks);
  })
);

foodRoute.put(
  "/:id",
  foodModifyRule,
  validate,
  asyncHandler(async (req, res): Promise<void> => {
    await foodService.updateFoodTruckById(req.params?.id, req.body);
    res.sendStatus(HTTPStatusCode.RESOURCE_UPDATE_SUCCESFULLY);
  })
);

foodRoute.delete(
  "/:id",
  validate,
  asyncHandler(async (req, res): Promise<void> => {
    await foodService.deleteFoodTruckById(parseInt(req.params?.id));
    res.sendStatus(HTTPStatusCode.RESOURCE_UPDATE_SUCCESFULLY);
  })
);
