import { Router } from "express";
import PartyControllers from "../controllers/parties";
import validate from "../controllers/parties/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const partyRouters = Router();

partyRouters
  .post(
    "/parties",
    authenticate,
    authorize(Admin),
    validate,
    PartyControllers.create
  )
  .get("/parties", authenticate, PartyControllers.getAll)
  .get("/parties/:id", authenticate, PartyControllers.getOne)
  .put("/parties/:id", authenticate, PartyControllers.update)
  .delete("/parties/:id", authenticate, PartyControllers.deleteOne);

export default partyRouters;
