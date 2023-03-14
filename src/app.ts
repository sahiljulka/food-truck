import express from "express";
import { foodRoute } from "./routes/foodRoute";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";

const app: express.Application = express();

const corsConfiguration = {
  origin: function (origin, callback) {
    if (
      process.env.ENV === "dev" ||
      (origin && origin.startsWith(process.env.ALLOWED_URL))
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.static(__dirname + "/dist"));
app.use(cors(corsConfiguration));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + "index.html");
});

app.use("/api/v1/foodtruck", foodRoute);

app.use(errorHandler);

export default app;
