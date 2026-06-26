import mongoose, { type InferSchemaType, type HydratedDocument, Model } from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Pls provide song title"],
  },
  artist: {
    type: String,
    required: [true, "Pls provide artist name"],
  },
  imageUrl: {
    type: String,
    required: true,
  }, 
  audioUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true
  },
  albumId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  }
  
}, { timestamps: true });

export type SongType = InferSchemaType<typeof songSchema>;
export type SongDocument = HydratedDocument<SongType>;

const SongModel: Model<SongType> = mongoose.model<SongType>("Song", songSchema);

export default SongModel;