import { Router } from "express";
import PartyControllers from "../controllers/parties";
import validate from "../controllers/parties/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const partyRouters = Router();
partyRouters.all("*", authenticate);
partyRouters
  .post("/parties", authorize(Admin), validate, PartyControllers.create)
  .get("/parties", PartyControllers.getAll)
  .get("/parties/:id", PartyControllers.getOne)
  .put("/parties/:id", validate, PartyControllers.update)
  .delete("/parties/:id", PartyControllers.deleteOne);

export default partyRouters;
