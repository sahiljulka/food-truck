import { HTTPStatusCode } from "../constants/constants";
import { sequelize } from "../database/db-connection";
import FoodTruck from "../entities/foodTruck";
import { IFoodRepo } from "./IfoodRepo";

class FoodRepo implements IFoodRepo {
  readonly model: typeof FoodTruck;

  constructor(model: typeof FoodTruck) {
    this.model = model;
  }

  createFoodTruck = async (foodTruck: FoodTruck): Promise<number> => {
    return (await this.model.create(foodTruck)).id;
  };

  getFoodTrucksFor = async (date: Date): Promise<FoodTruck[]> => {
    return await this.model.findAll({
      where: sequelize.where(
        sequelize.fn("date", sequelize.col("Date")),
        "=",
        date
      ),
      order: [["id", "ASC"]],
    });
  };

  updateFoodTruckById = async (
    id: number,
    foodTruck: FoodTruck
  ): Promise<void> => {
    const data = await this.model.update(foodTruck, {
      where: {
        id,
      },
    });
    if (data[0] === 0)
      throw Object.assign(new Error(), {
        status: HTTPStatusCode.INTERNAL_SERVER_ERROR,
        message: `Food truck with id ${id} not found`,
      });
  };

  deleteFoodTruckById = async (id: number): Promise<void> => {
    const data = await this.model.destroy({ where: { id } });
    if (data === 0)
      throw Object.assign(new Error(), {
        status: HTTPStatusCode.INTERNAL_SERVER_ERROR,
        message: `Food truck with id ${id} not found`,
      });
  };
}

export default new FoodRepo(FoodTruck);
