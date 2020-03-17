import { Router } from "express";
import CandidateControllers from "../controllers/candidates";
import validate from "../controllers/candidates/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const candidatesRouters = Router();

candidatesRouters.post(
  "/offices/candidates",
  authenticate,
  authorize(Admin),
  validate,
  CandidateControllers.create
);

export default candidatesRouters;
