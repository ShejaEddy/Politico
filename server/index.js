import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: "Welcome to Politico API V1 Gateway"
  })
);

app.use("/api", routes);

const server = app.listen(
  PORT,
  () =>
    process.env.NODE_ENV === "development" &&
    console.log(`Listening on port ${PORT}`)
);

export default server;
