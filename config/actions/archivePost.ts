"use server";

import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

const archivePost = async (postId: string) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  }
  const postToArchive = await Post.findById(postId);

  if (!postToArchive) {
    throw new Error("Post Not Found")
  } else if (postToArchive.user.toString() !== sessionUser.userId) {
    throw new Error("Unauthorized");
  }

  postToArchive.status = "archive";
  await postToArchive.save();
  revalidatePath("/", "layout");
  return { message: "Post archived!" };
}

export default archivePost;