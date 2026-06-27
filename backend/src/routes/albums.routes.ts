import {Router} from "express";
import * as albumController from "../controllers/album.controller.js";

const albumRouter = Router();
// TODO : generate doc comments

albumRouter.get("/", albumController.getAllAlbums);
albumRouter.get("/:albumId", albumController.getAlbumById);

export default albumRouter;