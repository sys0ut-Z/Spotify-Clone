import type { Request, Response, NextFunction } from "express";
import SongModel from "../models/song.model.js";

const getAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await SongModel.find({}).sort({createdAt: -1});

    res.status(200).json({songs});
  } catch (error) {
    next(error);
  }
}

// we will return six random songs to display on home page
const getFeaturedSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await SongModel.aggregate(
      [
        {
          $sample: {size: 6}
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1
          }
        }
      ]
    );

    res.status(200).json({songs});
  } catch (error) {
    next(error);
  }
}

// get four random songs for made for you
const getMadeForYou = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await SongModel.aggregate(
      [
        {
          $sample: {size: 4}
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1
          }
        }
      ]
    );

    res.status(200).json({songs});
  } catch (error) {
    next(error);
  }
}

// const getTrendingSongs = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
    
//   } catch (error) {
//     next(error);
//   }
// }

export {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYou
}