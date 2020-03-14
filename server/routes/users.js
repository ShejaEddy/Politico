import { Router } from "express";
import UserControllers from "../controllers/users";
import validate, { validateLogin } from "../controllers/users/validate";

const userRouters = Router();

userRouters.post("/auth", validateLogin, UserControllers.auth);
userRouters.post("/users", validate, UserControllers.create);

export default userRouters;
