"use server";

import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

const togglePostLike = async (postId: string) => {
  let userLikeUpdatedStatus = false;
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const postToToggle = await Post.findById(postId);
    const userLikedIndex = postToToggle.likes.includes(sessionUser.userId);
    if (userLikedIndex) {
      postToToggle.likes.pull(sessionUser.userId);
    } else {
      postToToggle.likes.push(sessionUser.userId);
      userLikeUpdatedStatus = true;
    }
    await postToToggle.save();
    revalidatePath("/", "layout");
    return userLikeUpdatedStatus;
  }
}

export default togglePostLike;