"use server";

import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

const followUser = async (formData: FormData) => {
  const userToFollowId = formData.get("userToFollowId");
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const userFollowing = await User.findById(sessionUser.userId);
  const userToFollow = await User.findById(userToFollowId);

  if (!userToFollow) {
    throw new Error("User not found");
  }

  if (
    userFollowing.relationships.following.includes(userToFollow._id) ||
    userFollowing.relationships.mutual.includes(userToFollow._id)
  ) {
    throw new Error("You are already following this user");
  }

  if (userToFollow.relationships.following.includes(userFollowing._id)) {
    const userToFollowIdx = userToFollow.relationships.following.indexOf(userFollowing._id);
    const userIdx = userFollowing.relationships.followers.indexOf(userToFollow._id);

    userToFollow.relationships.following.splice(userToFollowIdx, 1);
    userFollowing.relationships.followers.splice(userIdx, 1);

    userToFollow.relationships.mutual.push(userFollowing._id);
    userFollowing.relationships.mutual.push(userToFollow._id);
  } else {
    userFollowing.relationships.following.push(userToFollow._id);
    userToFollow.relationships.followers.push(userFollowing._id);
  }

  await userFollowing.save();
  await userToFollow.save();

  revalidatePath("/", "layout");
}

export default followUser;