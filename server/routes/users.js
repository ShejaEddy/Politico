import { Router } from "express";
import UserControllers from "../controllers/users";
import { validateLogin } from "../controllers/users/validate";

const userRouters = Router();

userRouters.post("/auth", validateLogin, UserControllers.auth);

export default userRouters;
