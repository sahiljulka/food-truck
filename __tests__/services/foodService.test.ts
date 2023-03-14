import FoodTruckDTO from "../../src/dto/foodTruckDto";
import FoodTruck from "../../src/entities/foodTruck";
import foodRepo from "../../src/repos/foodRepo";
import foodService from "../../src/services/foodService";

describe("FoodService", () => {
  describe("storeFoodTruck", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should create foodTruckDTO by calling repo", async () => {
      const foodTruckDTO: FoodTruckDTO = {
        name: "Test Food Truck",
        date: new Date(),
      };
      const expectedFoodTruckId = 1;

      jest.spyOn(foodRepo, "createFoodTruck").mockResolvedValue(1);

      const result = await foodService.storeFoodTruck(foodTruckDTO);

      expect(foodRepo.createFoodTruck).toHaveBeenCalledWith(foodTruckDTO);
      expect(result).toBe(expectedFoodTruckId);
    });
  });

  describe("getFoodTrucksFor", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should get foodtrucks for given date", async () => {
      const foodTruckDTO = [
        {
          name: "Test Food Truck",
          date: new Date(),
          id: 1,
        },
      ] as unknown as FoodTruck[];

      jest.spyOn(foodRepo, "getFoodTrucksFor").mockResolvedValue(foodTruckDTO);

      await foodService.getFoodTrucksFor(new Date("2023-01-01"));

      expect(foodRepo.getFoodTrucksFor).toHaveBeenCalledWith(
        new Date("2023-01-01")
      );
    });
  });

  describe("updateFoodTruckById", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update the food truck by id", async () => {
      const foodTruckDTO: FoodTruckDTO = {
        name: "Test Food Truck",
        date: new Date(),
      };

      jest.spyOn(foodRepo, "updateFoodTruckById").mockResolvedValue();

      await foodService.updateFoodTruckById(1, foodTruckDTO);

      expect(foodRepo.updateFoodTruckById).toHaveBeenCalledWith(
        1,
        foodTruckDTO
      );
    });
  });

  describe("deleteFoodTruckById", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should delete the food truck by id", async () => {
      jest.spyOn(foodRepo, "deleteFoodTruckById").mockResolvedValue();

      await foodService.deleteFoodTruckById(1);

      expect(foodRepo.deleteFoodTruckById).toHaveBeenCalledWith(1);
    });
  });
});
