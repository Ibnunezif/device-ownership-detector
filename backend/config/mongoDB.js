import mongoose from "mongoose";
import "dotenv/config";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb atlas");
  } catch (error) {
    console.error("mongodb connection failed: " + error.message);
  }
};

export default connectToDB;
