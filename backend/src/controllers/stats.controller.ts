import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model.js";
import SongModel from "../models/song.model.js";
import AlbumModel from "../models/album.model.js";

const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [totalSongs, totalAlbums, totalUsers] = await Promise.all([
      SongModel.countDocuments(), 
      AlbumModel.countDocuments(),
      UserModel.countDocuments()
    ]);

    /* 
      this method is more convinient because the count operation is done inside Mongo DB
    */
    const artistsRes = await SongModel.aggregate([
      { $group: { _id: "$artist" } },
      { $count: "totalArtists" } 
    ]);
    const totalArtists = artistsRes[0]?.totalArtists || 0;

    // OR 

    // const totalArtists = (await SongModel.aggregate([
    //   {
    //     $group: {
    //       _id: "$artist",
    //     }
    //   }
    // ])).length;

    res.status(200).json({
      stats: {
        totalSongs,
        totalAlbums,
        totalArtists,
        totalUsers
      }
    });
  } catch (error) {
    next(error);
  }
}

export {
  getStats
}