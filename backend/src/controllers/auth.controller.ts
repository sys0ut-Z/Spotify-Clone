import type { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model.js";

const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if(!firstName || !lastName){
      throw new Error("firstName and lastName are required");
    }
    
    console.log({
      id, firstName, lastName, imageUrl
    });
    
    // console.log({id, firstName, lastName, imageUrl});
    
    // check if user is already logged in
    const user = await UserModel.findOne({ clerkId: id });

    // if user does not exist, add in db
    if (!user) {
      console.log("if entered...");
      await UserModel.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl
      });
    }

    res.status(200).json({ success: true });
  }
  catch (error) {
    next(error);
  }
}

export{
  authCallback
}