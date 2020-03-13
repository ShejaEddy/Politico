import UserControllers from "../controllers/users";
import validate from "../controllers/users/validate";
import { Router } from "express";

const userRouters = Router();

userRouters.post("/auth", validate, UserControllers.auth);

export default userRouters;
