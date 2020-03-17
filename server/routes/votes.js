import { Router } from "express";
import VoteControllers from "../controllers/votes";
import validate from "../controllers/votes/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { User } from "../helpers/roles";

const votesRouters = Router();

votesRouters.post(
  "/votes",
  authenticate,
  authorize(User),
  validate,
  VoteControllers.create
);

export default votesRouters;
