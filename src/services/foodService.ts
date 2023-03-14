import FoodTruckDTO from "../dto/foodTruckDto";
import FoodTruck from "../entities/foodTruck";
import foodRepo from "../repos/foodRepo";
import { IfoodService } from "./IfoodService";

class FoodService implements IfoodService {
  storeFoodTruck = async (foodTruckDTO: FoodTruckDTO): Promise<number> => {
    return foodRepo.createFoodTruck(foodTruckDTO as FoodTruck);
  };

  getFoodTrucksFor = async (date: Date): Promise<FoodTruckDTO[]> => {
    const foodTrucks: FoodTruck[] = await foodRepo.getFoodTrucksFor(date);
    return foodTrucks.map((foodTruck) => ({
      name: foodTruck.name,
      date: foodTruck.date,
      id: foodTruck.id,
    }));
  };

  updateFoodTruckById = async (
    id: number,
    foodTruckDTO: FoodTruckDTO
  ): Promise<void> => {
    await foodRepo.updateFoodTruckById(id, {
      name: foodTruckDTO.name,
      date: foodTruckDTO.date,
    } as FoodTruck);
  };

  deleteFoodTruckById = async (id: number): Promise<void> => {
    await foodRepo.deleteFoodTruckById(id);
  };
}
export default new FoodService();
