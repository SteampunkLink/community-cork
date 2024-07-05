"use server";

import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import getUserAndPopulateRelationships from "@/utils/getUserAndPopulateRelationships";
import Post from "@/models/Post";

async function getUserProfileData(uid: string) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const foundUser = await getUserAndPopulateRelationships({ userId: uid, loggedInUserId: sessionUser.userId })

    const posts = await Post.find({ user: uid });
    const formattedPosts = posts.map((post) => ({
      status: post.status,
      postId: post._id,
      posterId: foundUser.myData.uid,
      user: foundUser.myData.displayname,
      image: foundUser.myData.image,
      body: post.body,
      likes: post.likes.length,
      color: post.color,
      date: `
      ${new Date(post.createdAt).getUTCMonth() + 1}/${new Date(post.createdAt).getUTCDate()}/${new Date(post.createdAt).getUTCFullYear()} `
    }));

    return { foundUser, formattedPosts }
  }
}

export default getUserProfileData;