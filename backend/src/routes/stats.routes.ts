import {Router} from "express";
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware.js";
import * as statsController from "../controllers/stats.controller.js";

const statsRouter = Router();

// TODO : generate doc comments

// get all the stats(total songs, total albums, total artists, total users)
statsRouter.get("/", authMiddleware, adminMiddleware, statsController.getStats);

export default statsRouter;