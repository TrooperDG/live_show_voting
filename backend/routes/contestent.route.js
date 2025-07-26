import express from "express";
import {
  addContestent,
  updateContestent,
  deleteContestent,
  getAllContestents,
  getContestent,
} from "../controllers/contestent.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/adminAuth.middleware.js";

const contetstentRouter = express.Router();

contetstentRouter.post(
  "/add-contestent",
  isAuthenticated,
  isAdmin,
  addContestent
);
contetstentRouter.patch(
  "/update-contestent/:id",
  isAuthenticated,
  isAdmin,
  updateContestent
);
contetstentRouter.delete(
  "/delete-contestent/:id",
  isAuthenticated,
  isAdmin,
  deleteContestent
);

//get--
contetstentRouter.get(
  "/get-contestent/:id",
  isAuthenticated,
  isAdmin,
  getContestent
);
contetstentRouter.get(
  "/get-all-contestents",
  isAuthenticated,
  isAdmin,
  getAllContestents
);

export default contetstentRouter;
