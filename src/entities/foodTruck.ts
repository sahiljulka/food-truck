import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({ tableName: "Food_Truck", updatedAt: false, createdAt: false })
export default class FoodTruck extends Model<FoodTruck> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "Id",
  })
  public id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    field: "Name",
  })
  public name!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "Date",
  })
  public date!: Date;
}
