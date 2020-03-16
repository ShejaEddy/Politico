import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";
import { notFound } from "./helpers/response";

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
app.use(
  morgan("dev", {
    skip: (_req, res) => res.statusCode < 400,
    stream: process.stderr
  })
);

app.use(
  morgan("dev", {
    skip: (_req, res) => res.statusCode >= 400,
    stream: process.stdout
  })
);

app.use((_req, res) => notFound(res, "This page does not exist!"));

export default app;
