import express  from "express";
import { getUser } from "../controllers/usersControllers.js";
import { verifyToken } from "../middlewares/tokenMiddleware.js";

const usersRouter = express.Router();

usersRouter.get("/users/me", verifyToken, getUser);

export default usersRouter;