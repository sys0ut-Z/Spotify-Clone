import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("Connected to MongoDB");
    console.log("Host : ", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};