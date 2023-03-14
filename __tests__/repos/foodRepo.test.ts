import { sequelize } from "../../src/database/db-connection";
import FoodTruck from "../../src/entities/foodTruck";
import foodRepo from "../../src/repos/foodRepo";

describe("FoodRepo", () => {
  describe("createFoodTruck", () => {
    beforeEach(() => {
      jest.spyOn(FoodTruck, "create").mockResolvedValue({ id: 1 });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new FoodTruck", async () => {
      const mockFoodTruck = {
        id: 1,
        name: "Food Truck 1",
        date: "2022-03-14",
      };

      const result = await foodRepo.createFoodTruck(
        mockFoodTruck as unknown as FoodTruck
      );

      expect(FoodTruck.create).toHaveBeenCalledWith(mockFoodTruck);
      expect(result).toBe(1);
    });
  });

  describe("getFoodTrucksFor", () => {
    const mockFoodTrucks = [
      { id: 1, name: "Food Truck 1", date: "2022-03-14" },
      { id: 2, name: "Food Truck 2", date: "2022-03-14" },
    ] as unknown as FoodTruck[];

    beforeEach(() => {
      jest.spyOn(FoodTruck, "findAll").mockResolvedValue(mockFoodTrucks);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should retrieve FoodTrucks for a given date", async () => {
      const date = new Date("2022-03-14");
      const result = await foodRepo.getFoodTrucksFor(date);

      expect(FoodTruck.findAll).toHaveBeenCalledWith({
        where: sequelize.where(
          sequelize.fn("date", sequelize.col("Date")),
          "=",
          date
        ),
        order: [["id", "ASC"]],
      });
      expect(result).toEqual(mockFoodTrucks);
    });
  });

  describe("updateFoodTruckById", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const mockFoodTruck = {
      id: 1,
      name: "Food Truck 1",
      date: "2022-03-14",
    } as unknown as FoodTruck;

    it("should update an existing FoodTruck", async () => {
      jest.spyOn(FoodTruck, "update").mockResolvedValue([1]);

      await foodRepo.updateFoodTruckById(1, mockFoodTruck);

      expect(FoodTruck.update).toHaveBeenCalledWith(mockFoodTruck, {
        where: { id: 1 },
      });
    });

    it("should throw an error if FoodTruck is not found", async () => {
      jest.spyOn(FoodTruck, "update").mockResolvedValue([0]);

      const id = 1;

      await expect(async () => {
        await foodRepo.updateFoodTruckById(id, mockFoodTruck);
      }).rejects.toThrow(new Error(`Food truck with id ${id} not found`));
    });
  });

  describe("deleteFoodTruckById", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update an existing FoodTruck", async () => {
      jest.spyOn(FoodTruck, "destroy").mockResolvedValue(1);

      await foodRepo.deleteFoodTruckById(1);

      expect(FoodTruck.destroy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should throw an error if FoodTruck is not found", async () => {
      const id = 1;
      jest.spyOn(FoodTruck, "destroy").mockResolvedValue(0);

      await expect(async () => {
        await foodRepo.deleteFoodTruckById(id);
      }).rejects.toThrow(new Error(`Food truck with id ${id} not found`));
    });
  });
});
