import type { UploadedFile } from "express-fileupload";
import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (file: UploadedFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.tempFilePath, {
      folder: "spotify_clone",
      resource_type: "auto",
    },
    (error, result) => {
      if (error || !result) reject(error);
      else resolve(result.secure_url);
    });
  });
};