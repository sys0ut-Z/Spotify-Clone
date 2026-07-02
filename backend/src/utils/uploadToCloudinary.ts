import type { UploadedFile } from "express-fileupload";
import cloudinary from "../lib/cloudinaryConfig.js";
import path from "path";
import fs from "fs";

export const uploadToCloudinary = async (file: UploadedFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.tempFilePath, {
      folder: "spotify_clone",
      resource_type: "auto",
    }, 
    // TODO : file unlink bug
    (error, result) => {
      // remove file from tmp folder
      /* 
        this will run whether the file has uploaded or not,
        so that it won't get piled up with unnecessary files
      */
      fs.unlink(file.tempFilePath, (unlinkError) => {
        if(unlinkError){
          console.error("Error deleting file:", unlinkError);
        }
      });
      if (error || !result) reject(error);
      else resolve(result.secure_url);
    });
  });
};