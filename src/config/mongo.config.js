import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Mongo connected");
  } catch (error) {
    console.error(error);
  }
};
