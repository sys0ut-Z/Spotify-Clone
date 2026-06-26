import {Router} from "express";
import * as songController from "../controllers/song.controller.js";
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware.js";

const songRouter = Router();

// TODO : generate doc comments

// admin will see all the songs
songRouter.get("/", authMiddleware, adminMiddleware, songController.getAllSongs);

// six random featured songs for home page
songRouter.get("/featured", songController.getFeaturedSongs);
songRouter.get("/made-for-you", songController.getMadeForYou);
export default songRouter;