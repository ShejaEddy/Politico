import { Router } from "express";
import filesReader from "../helpers/readFiles";

const routes = filesReader(__dirname, __filename);
const router = Router();
const requests = Object.keys(routes).map(route => routes[route].default);

router.use("/v1", ...requests);

export default router;
