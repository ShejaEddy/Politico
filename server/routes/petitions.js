import { Router } from "express";
import PetitionControllers from "../controllers/petitions";
import validate from "../controllers/petitions/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const petitionRouters = Router();
petitionRouters.all("*", authenticate);
petitionRouters
  .post("/petitions", validate, PetitionControllers.create)
  .get("/petitions", authorize(Admin), PetitionControllers.getAll)
  .get("/petitions/:id", PetitionControllers.getOne)
  .get("/petitions/users/:id", PetitionControllers.getUserPetitions)
  .put("/petitions/:id", PetitionControllers.update)
  .delete("/petitions/:id", PetitionControllers.deleteOne);

export default petitionRouters;
