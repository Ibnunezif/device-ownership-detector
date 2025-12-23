import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb atlas");
  } catch (error) {
    console.error("mongodb connection failed: " + error.message);
  }
};

export default connectToDB;
