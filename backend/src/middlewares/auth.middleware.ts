import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/GlobalErrorHandler.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = getAuth(req);

    if(!userId){
      throw new AppError("Unauthorized, pls login", 401);
    }
    next();
  } catch (error) {
    next(error);
  }
}

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = getAuth(req);

    // we will check first whether user is authenticated, so userId will not be null if it reaches here
    const currentUser = await clerkClient.users.getUser(userId!);

    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if(!isAdmin){
      throw new AppError("Unauthorized, you must be an admin", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
}
