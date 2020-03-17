import { Router } from "express";
import VoteControllers from "../controllers/votes";
import validate from "../controllers/votes/validate";
import authenticate from "../middleware/authenticate";

const votesRouters = Router();
votesRouters
  .post("/votes", authenticate, validate, VoteControllers.create)
  .get("/votes/:id", authenticate, VoteControllers.get);

export default votesRouters;
