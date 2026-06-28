import type { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { getAuth } from "@clerk/express";

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = getAuth(req);

    // all users except the authenticated user
    const users = await UserModel.find({clerkId: {$ne: userId}});

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    next(error);
  }
}

export {
  getAllUsers
}