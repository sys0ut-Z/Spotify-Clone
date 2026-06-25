import mongoose, { Model, type HydratedDocument, type InferSchemaType } from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Pls provide album title"],
  },
  artist: {
    type: String,
    required: [true, "Pls provide artist name"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    }
  ],  
});

export type AlbumType = InferSchemaType<typeof albumSchema>;
export type AlbumDocument = HydratedDocument<AlbumType>;

const AlbumModel: Model<AlbumType> = mongoose.model<AlbumType>("Album", albumSchema);

export default AlbumModel;