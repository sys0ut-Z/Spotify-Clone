import type { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import MessageModel from "../models/message.model.js";

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

const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {userId: myId} = getAuth(req);
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId);

    if(!user){
      throw new Error("User not found, unable to get messages");
    }

    const messages = await MessageModel.find({
      $or: [
        {senderId: myId, receiverId: userId},
        {senderId: userId, receiverId: myId}
      ]
    })
    .sort({createdAt: 1}); // latest messages at bottom
    
    res.status(200).json({messages});
  } catch (error) {
    next(error);
  }
}

export {
  getAllUsers,
  getAllMessages
}