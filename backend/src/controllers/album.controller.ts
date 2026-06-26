import type { NextFunction, Request, Response } from "express";
import AlbumModel from "../models/album.model.js";

const getAllAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const albums = await AlbumModel.find({});

    res.status(200).json({
      success: true,
      albums
    });
  } catch (error) {
    next(error);
  }
}

const getAlbumById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const albumId = req.params.albumId;

    const album = await AlbumModel.findById(albumId).populate("songs");

    if(!album){
      throw new Error("Album not found");
    }

    res.status(200).json({
      success: true,
      album
    });
  } catch (error) {
    next(error);
  }
}

export {
  getAllAlbums,
  getAlbumById
}