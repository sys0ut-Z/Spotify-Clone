import {Router} from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

// TODO : generate doc comments

authRouter.post("/callback", authController.authCallback);

export default authRouter;