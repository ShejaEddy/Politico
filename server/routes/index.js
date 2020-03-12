import { Router } from "express";

const router = Router();

router.use("/v1/", (_req, res) => res.send("routing start now"));

export default router;
