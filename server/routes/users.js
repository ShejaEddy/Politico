import { Router } from "express";
import UserControllers from "../controllers/users";
import validate, {
  validateLogin,
  validatePassword,
  validateEmail
} from "../controllers/users/validate";
import authenticate from "../middleware/authenticate";

const userRouters = Router();

userRouters
  .post("/auth", validateLogin, UserControllers.auth)
  .post("/users", validate, UserControllers.create)
  .get("/users/:id", authenticate, UserControllers.getOne)
  .post("/auth/reset_password", validatePassword, UserControllers.resetPassword)
  .post("/auth/forgot_password", validateEmail, UserControllers.forgotPassword);

export default userRouters;
