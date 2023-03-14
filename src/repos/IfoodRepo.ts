import FoodTruck from "../entities/foodTruck";

export interface IFoodRepo {
  readonly model: typeof FoodTruck;

  createFoodTruck: (foodTruck: FoodTruck) => Promise<number>;
  getFoodTrucksFor: (date: Date) => Promise<FoodTruck[]>;
  updateFoodTruckById: (id: number, foodTruck: FoodTruck) => void;
  deleteFoodTruckById: (id: number) => void;
}
