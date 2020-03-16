import { Router } from "express";
import OfficeControllers from "../controllers/offices";
import validate from "../controllers/offices/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { Admin } from "../helpers/roles";

const officeRouters = Router();
officeRouters.all("*", authenticate);
officeRouters
  .post("/parties", authorize(Admin), validate, OfficeControllers.create)
  .get("/parties", OfficeControllers.getAll)
  .get("/parties/:id", OfficeControllers.getOne)
  .put("/parties/:id", authorize(Admin), validate, OfficeControllers.update)
  .delete("/parties/:id", authorize(Admin), OfficeControllers.deleteOne);

export default officeRouters;
