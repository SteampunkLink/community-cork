"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";

const deletePost = async (postId: string) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  }
  const postToDelete = await Post.findById(postId);

  if (!postToDelete) {
    throw new Error("Post Not Found")
  } else if (postToDelete.user.toString() !== sessionUser.userId) {
    throw new Error("Unauthorized");
  }

  await postToDelete.deleteOne();
  revalidatePath("/", "layout");
  return { message: "Post deleted!" };
}

export default deletePost;