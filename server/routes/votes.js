import { Router } from "express";
import VoteControllers from "../controllers/votes";
import validate from "../controllers/votes/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const votesRouters = Router();

votesRouters.post(
  "/votes",
  authenticate,
  authorize(Admin),
  validate,
  VoteControllers.create
);

export default votesRouters;
