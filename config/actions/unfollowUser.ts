"use server";

import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

const unfollowUser = async (userId: string) => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const loggedInUser = await User.findById(sessionUser.userId);
  const userToUnfollow = await User.findById(userId);

  if (!userToUnfollow) {
    throw new Error("User not found");
  }

  if (loggedInUser.relationships.mutual.includes(userToUnfollow._id)) {
    const loggedInUserIdx = loggedInUser.relationships.mutual.indexOf(userToUnfollow._id);
    const userToUnfollowIdx = userToUnfollow.relationships.mutual.indexOf(loggedInUser._id);

    loggedInUser.relationships.mutual.splice(loggedInUserIdx, 1);
    userToUnfollow.relationships.mutual.splice(userToUnfollowIdx, 1);

    loggedInUser.relationships.followers.push(userToUnfollow._id);
    userToUnfollow.relationships.following.push(loggedInUser._id);
  } else {
    const loggedInUserIdx = loggedInUser.relationships.following.indexOf(userToUnfollow._id);
    const userToUnfollowIdx = userToUnfollow.relationships.followers.indexOf(loggedInUser._id);

    loggedInUser.relationships.following.splice(loggedInUserIdx, 1);
    userToUnfollow.relationships.followers.splice(userToUnfollowIdx, 1);
  }

  await loggedInUser.save();
  await userToUnfollow.save();

  revalidatePath("/", "layout");
}

export default unfollowUser;