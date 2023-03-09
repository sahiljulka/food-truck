import app from "./app";
import logger from "./utilities/Logger";

const port = process.env.API_PORT || 3000;

app.listen(port,()=>{
    logger.info(`Server Started on ${port}`)
})