import { Router } from "express";
import PetitionControllers from "../controllers/petitions";
import validate from "../controllers/petitions/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin, User } from "../helpers/roles";

const petitionRouters = Router();
petitionRouters
  .post(
    "/petitions",
    authenticate,
    authorize(User),
    validate,
    PetitionControllers.create
  )
  .get("/petitions", authenticate, authorize(Admin), PetitionControllers.getAll)
  .get(
    "/petitions/current",
    authenticate,
    authorize(User),
    PetitionControllers.getUserPetitions
  )
  .get("/petitions/:id", authenticate, PetitionControllers.getOne)
  .put(
    "/petitions/:id",
    authenticate,
    authorize(User),
    PetitionControllers.update
  )
  .delete(
    "/petitions/:id",
    authenticate,
    authorize(User),
    PetitionControllers.deleteOne
  );

export default petitionRouters;
