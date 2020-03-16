import { Router } from "express";
import OfficeControllers from "../controllers/offices";
import validate from "../controllers/offices/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const officeRouters = Router();
officeRouters
  .post(
    "/offices",
    authenticate,
    authorize(Admin),
    validate,
    OfficeControllers.create
  )
  .get("/offices", authenticate, OfficeControllers.getAll)
  .get("/offices/:id", authenticate, OfficeControllers.getOne)
  .put(
    "/offices/:id",
    authenticate,
    authorize(Admin),
    validate,
    OfficeControllers.update
  )
  .delete(
    "/offices/:id",
    authenticate,
    authorize(Admin),
    OfficeControllers.deleteOne
  );

export default officeRouters;
