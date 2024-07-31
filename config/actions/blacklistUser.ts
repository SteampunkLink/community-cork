"use server";

import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

const blackListUser = async (userId: string) => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const loggedInUser = await User.findById(sessionUser.userId);
  const userToBlacklist = await User.findById(userId);

  if (!userToBlacklist) {
    throw new Error("User not found");
  }

  // remove any existing relationships
  if (loggedInUser.relationships.mutual.includes(userToBlacklist._id)) {
    const loggedInUserIdx = loggedInUser.relationships.mutual.indexOf(userToBlacklist._id);
    const userToBlacklistIdx = userToBlacklist.relationships.mutual.indexOf(loggedInUser._id);

    loggedInUser.relationships.mutual.splice(loggedInUserIdx, 1);
    userToBlacklist.relationships.mutual.splice(userToBlacklistIdx, 1);
  } else if (loggedInUser.relationships.following.includes(userToBlacklist._id)) {
    const loggedInUserIdx = loggedInUser.relationships.following.indexOf(userToBlacklist._id);
    const userToBlacklistIdx = userToBlacklist.relationships.followers.indexOf(loggedInUser._id);

    loggedInUser.relationships.following.splice(loggedInUserIdx, 1);
    userToBlacklist.relationships.followers.splice(userToBlacklistIdx, 1);
  } else if (loggedInUser.relationships.followers.includes(userToBlacklist._id)) {
    const loggedInUserIdx = loggedInUser.relationships.followers.indexOf(userToBlacklist._id);
    const userToBlacklistIdx = userToBlacklist.relationships.following.indexOf(loggedInUser._id);

    loggedInUser.relationships.followers.splice(loggedInUserIdx, 1);
    userToBlacklist.relationships.following.splice(userToBlacklistIdx, 1);
  }

  loggedInUser.options.blacklist.push(userToBlacklist._id);

  const loggedInUserPosts = await Post.find({ user: loggedInUser._id, likes: userToBlacklist._id });
  const blacklistUserPosts = await Post.find({ user: userToBlacklist._id, likes: loggedInUser._id });

  loggedInUserPosts.forEach((post) => {
    const postLikeIdx = post.likes.indexOf(userToBlacklist._id);
    post.likes.splice(postLikeIdx, 1);
    post.save();
  });

  blacklistUserPosts.forEach((post) => {
    const postLikeIdx = post.likes.indexOf(loggedInUser._id);
    post.likes.splice(postLikeIdx, 1);
    post.save();
  });

  await loggedInUser.save();
  await userToBlacklist.save();

  revalidatePath("/", "layout");
}

export default blackListUser;