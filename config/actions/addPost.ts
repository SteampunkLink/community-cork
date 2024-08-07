"use server"

import { revalidatePath } from "next/cache";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import Post from "@/models/Post";
import { redirect } from "next/navigation";

async function addPost(formData: FormData) {
  const redirectTo = formData.get("formRedirect") || "/";
  // Check for user
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  // Check user hasn't hit post limit
  const { userId } = sessionUser;
  const existingPostsCount = await Post.find({ user: userId, status: "pinned" }).countDocuments();
  if (existingPostsCount >= 12) {
    redirect(`${redirectTo}?limit=true`);
  }

  // Create new post
  const newPostData = {
    user: userId,
    body: formData.get("body"),
    color: formData.get("color"),
    likes: [],
    status: "pinned",
    visibility: formData.get("visibleTo")
  }
  const newPost = new Post(newPostData);
  await newPost.save();
  revalidatePath("/", "layout");
  if (existingPostsCount === 11) {
    redirect(`${redirectTo}?limit=true`);
  }
}

export default addPost;