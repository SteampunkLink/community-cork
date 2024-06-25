
import connectDB from "../db";
import User from "@/models/User";

// TODO - add types for return
export async function getUserData(id: string) {
  await connectDB();
  const foundUser = await User.findById(id).populate("relationships.followers").populate("relationships.following").populate("relationships.mutual");
  return foundUser;
}