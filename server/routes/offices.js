import { Router } from "express";
import OfficeControllers from "../controllers/offices";
import validate from "../controllers/offices/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const officeRouters = Router();
officeRouters
  .post(
    "/parties",
    authenticate,
    authorize(Admin),
    validate,
    OfficeControllers.create
  )
  .get("/parties", authenticate, OfficeControllers.getAll)
  .get("/parties/:id", authenticate, OfficeControllers.getOne)
  .put(
    "/parties/:id",
    authenticate,
    authorize(Admin),
    validate,
    OfficeControllers.update
  )
  .delete(
    "/parties/:id",
    authenticate,
    authorize(Admin),
    OfficeControllers.deleteOne
  );

export default officeRouters;
