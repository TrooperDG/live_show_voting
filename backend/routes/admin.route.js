import express from "express";
import {
  login,
  register,
  setPasscode,
} from "../controllers/admin.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/adminAuth.middleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);
adminRouter.post("/register", register);
adminRouter.patch("/set-passcode", isAuthenticated, isAdmin, setPasscode);

export default adminRouter;
