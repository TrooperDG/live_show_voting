import express from "express";
import {
  login,
  register,
  setPasscode,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);
adminRouter.post("/register", register);
adminRouter.patch("/set-passcode", setPasscode);

export default adminRouter;
