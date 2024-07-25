"use server";

import connectDB from "../db";
import User from "@/models/User";

const isNameAvailable = async (nameToCheck: string) => {
  let usernameIsAvailable = false;
  await connectDB();

  const displayNameinUse = await User.findOne({ "profile.displayname": nameToCheck })
  console.log(displayNameinUse);
  usernameIsAvailable = !displayNameinUse;

  return usernameIsAvailable;
}

export default isNameAvailable;