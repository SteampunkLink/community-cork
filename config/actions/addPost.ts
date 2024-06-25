"use server"

import { revalidatePath } from "next/cache";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import Post from "@/models/Post";

async function addPost(formData: FormData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const newPostData = {
    user: userId,
    body: formData.get("body"),
    color: formData.get("color"),
    likes: [],
    status: "pinned"
  }

  const newPost = new Post(newPostData);
  await newPost.save();

  revalidatePath("/myposts");
}

export default addPost;