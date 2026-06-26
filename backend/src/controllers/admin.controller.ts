import type { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { AppError } from "../utils/GlobalErrorHandler.js";
import SongModel from "../models/song.model.js";
import type { UploadedFile } from "express-fileupload";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import AlbumModel from "../models/album.model.js";

const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if(!req.files || !req.files.imageFile || !req.files.audioFile){
      throw new AppError("Pls provide image and audio file", 400);
    }

    const {title, artist, albumId, duration} = req.body;

    if(!title || !artist){
      throw new AppError("Pls provide title and artist", 400);
    }

    const imageFile = req.files.imageFile as UploadedFile;
    const audioFile = req.files.audioFile as UploadedFile;

    // upload files to cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);
    const audioUrl = await uploadToCloudinary(audioFile);

    const song = await SongModel.create({
      title,
      artist,
      imageUrl,
      audioUrl,
      duration,
      albumId: albumId || null
    });

    // if this song belongs to any album then add to it
    if(albumId){
      await AlbumModel.findByIdAndUpdate(albumId, {
        $addToSet: {songs: song._id}
      });
    }
    
    res.status(201).json({
      success: true,
      message: "Song added successfully", 
      song
    });

  } catch (error) {
    next(error);
  }
}

const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // add 'as' to satisfy Mongoose TS if you are using '{}' syntax
    const songId = req.params.songId;

    if(!songId){
      throw new AppError("Unable to delete song", 400);
    }

    const song = await SongModel.findById(songId);

    // first remove that song from album if it belongs to any album
    if(song?.albumId){
      await AlbumModel.findByIdAndUpdate(song.albumId, {
        $pull: {songs: songId}
      });
    }

    // remove song
    await SongModel.findByIdAndDelete(songId);

    res.status(200).json({
      success: true,
      message: "Song deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

const createAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {title, artist, releaseYear} = req.body;

    if(!title || !artist || !releaseYear){
      throw new AppError("Pls provide title, artist and release year", 400);
    }

    if(!req.files || !req.files.imageFile){
      throw new AppError("Pls provide album cover image", 400);
    }

    const imageFile = req.files.imageFile as UploadedFile;
    const imageUrl = await uploadToCloudinary(imageFile);

    const album = await AlbumModel.create({
      title,
      artist,
      imageUrl,
      releaseYear
    });

    res.status(201).json({
      success: true,
      message: "Album created successfully", 
      album
    });
  } catch (error) {
    next(error);
  }
}

const deleteAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {albumId} = req.params as {albumId: string};

    if(!albumId){
      throw new AppError("Unable to delete album", 400);
    }

    // check whether album exists or not
    const album = await AlbumModel.findById(albumId);

    if(!album){
      throw new AppError("Album not found, unable to delete", 404);
    }

    // remove album from songs
    await SongModel.updateMany({
      albumId: albumId
    }, {
      $set: {albumId: null}
    });

    // remove album
    await AlbumModel.findByIdAndDelete(albumId);

    res.status(200).json({
      success: true,
      message: "Album deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({admin: true});
}

export {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin
}