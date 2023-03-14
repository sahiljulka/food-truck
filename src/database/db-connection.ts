import { Sequelize } from "sequelize-typescript";
import dbConfig from "./config";
import path from "path";
import logger from "../utilities/logger";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "postgres",
    port: Number.parseInt(dbConfig.port),
  }
);

const entityPath = path.resolve(__dirname, "../entities");
logger.info(`loading entities from ${entityPath}`);
sequelize.addModels([entityPath]);

export const initDB = async (): Promise<void> => {
  logger.info("Initializing DB connection");

  try {
    await sequelize.authenticate();
    logger.info("DB Connection has been established successfully");
  } catch (err: any) {
    logger.error(`Unable to connect to the database: ${JSON.stringify(err)}`);
    throw new Error(err);
  }
};
