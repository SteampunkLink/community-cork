"use server";

import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const repinPost = async (postId: string, redirectTo: string) => {
  // Check for user
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  }

  // Check there is a post and it belongs to the user
  const postToRePin = await Post.findById(postId);
  if (!postToRePin) {
    throw new Error("Post Not Found")
  } else if (postToRePin.user.toString() !== sessionUser.userId) {
    throw new Error("Unauthorized");
  }

  // Check user hasn't hit post limit
  const { userId } = sessionUser;
  const existingPostsCount = await Post.find({ user: userId, status: "pinned" }).countDocuments();
  if (existingPostsCount >= 12) {
    redirect(`${redirectTo}?limit=true`);
  }

  // Update the post's status
  postToRePin.status = "pinned";
  await postToRePin.save();
  revalidatePath("/", "layout");
  if (existingPostsCount === 11) {
    redirect(`${redirectTo}?limit=true`);
  }
}

export default repinPost;