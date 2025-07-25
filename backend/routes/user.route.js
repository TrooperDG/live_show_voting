import express from "express";
import {
  login,
  register,
  voterAccess,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/voter-access", isAuthenticated, voterAccess);

export default userRouter;
