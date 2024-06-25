import mongoose from "mongoose";
import env from "@/utils/validateEnv";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(env.MONGODB_CONNECTION_STRING);
    connected = true;
    console.log("MongoDB connected")
  } catch (err) {
    console.log(err, "MongoDB Error!");
  }
}

export default connectDB;