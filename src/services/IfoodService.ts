import FoodTruckDTO from "../dto/foodTruckDto";

export interface IfoodService {
  storeFoodTruck: (foodTruckDTO: FoodTruckDTO) => Promise<number>;
  getFoodTrucksFor: (date: Date) => Promise<FoodTruckDTO[]>;
  updateFoodTruckById: (id: number, foodTruckDTO: FoodTruckDTO) => void;
  deleteFoodTruckById: (id: number) => void;
}
