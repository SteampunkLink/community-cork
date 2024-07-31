"use server";

import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

const unBlacklistUser = async (userId: string) => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const loggedInUser = await User.findById(sessionUser.userId);
  const userToUnblock = await User.findById(userId);

  if (!userToUnblock) {
    throw new Error("User not found");
  }

  const blacklistedUserIdx = loggedInUser.options.blacklist.indexOf(userToUnblock._id);
  loggedInUser.options.blacklist.splice(blacklistedUserIdx, 1);

  await loggedInUser.save();

  revalidatePath("/", "layout");
}

export default unBlacklistUser;