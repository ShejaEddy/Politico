import { Router } from "express";
import UserControllers from "../controllers/users";
import validate, { validateLogin } from "../controllers/users/validate";
import authenticate from "../middleware/authenticate";

const userRouters = Router();

userRouters
  .post("/auth", validateLogin, UserControllers.auth)
  .post("/users", validate, UserControllers.create)
  .get("/users/:id", authenticate, UserControllers.getOne);

export default userRouters;
