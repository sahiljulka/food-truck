import app from "./app";
import { initDB } from "./database/db-connection";
import logger from "./utilities/logger";

const port = process.env.API_PORT || 3000;

initDB().catch((error) => logger.error(`bootstrapping failed ${error}`));

app.listen(port, () => {
  logger.info(`Server Started on ${port}`);
});
