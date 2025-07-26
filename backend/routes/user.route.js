import express from "express";
import {
  login,
  register,
  logout,
  voterAccess,
  toggleVote,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { hasVoterAccess } from "../middlewares/voterAuth.middleware.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/logout", isAuthenticated, logout);
userRouter.post("/voter-access", isAuthenticated, voterAccess);
userRouter.patch(
  "/toggle-vote/:id",
  isAuthenticated,
  hasVoterAccess,
  toggleVote
);

export default userRouter;
