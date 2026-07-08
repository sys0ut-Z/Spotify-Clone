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
  const receiver = req.params.userId;

  if(!myId){
    throw new Error("User is not authenticated, unable to get messages");
  }

  if(!receiver){
    throw new Error("Receiver not found, unable to get messages");
  }
  
  // console.log("my id : ", myId)
  // console.log("userId : ", userId)
  
  try {
    const user = await UserModel.findOne({clerkId: receiver});

    if(!user){
      throw new Error("User not found, unable to get messages");
    }

    const messages = await MessageModel.find({
      $or: [
        {senderId: myId, receiverId: receiver},
        {senderId: receiver, receiverId: myId}
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