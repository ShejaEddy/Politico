import express from "express";
import cors from "cors";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (_req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: "Welcome to Politico API V1 Gateway"
  })
);

app.use("/api", routes);

export default app;
