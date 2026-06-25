import mongoose, { Model, type HydratedDocument, type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Pls provide full name"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<UserType>;

// explicitly mention Model type, this will really help in static methods
const UserModel: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default UserModel;
