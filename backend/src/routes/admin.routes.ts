import {Router} from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const adminRouter = Router();

// TODO : generate doc comments
adminRouter.use(authMiddleware, adminMiddleware);

adminRouter.get("/check", adminController.checkAdmin);

adminRouter.post("/add-song", adminController.createSong);
adminRouter.delete("/delete-song/:songId", adminController.deleteSong);

adminRouter.post("/create-album", adminController.createAlbum);
adminRouter.delete("/delete-album/:albumId", adminController.deleteAlbum);

export default adminRouter;