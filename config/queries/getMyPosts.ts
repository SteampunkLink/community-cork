import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";
import { INotePostData } from "@/components/post/PostBoard";

async function getMyPosts(): Promise<INotePostData[]> {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.user) {
    throw new Error("No User Found");
  } else {
    const userId = sessionUser.userId;
    const posts = await Post.find({ user: userId, status: "pinned" });
    const formattedPosts = posts.map((post) => ({
      postId: post._id,
      posterId: sessionUser.userId,
      user: sessionUser.user.name!,
      image: sessionUser.user.image!,
      body: post.body,
      likes: post.likes.length,
      color: post.color,
      date: `
      ${new Date(post.createdAt).getUTCMonth() + 1}/${new Date(post.createdAt).getUTCDate()}/${new Date(post.createdAt).getUTCFullYear()}
    `
    }))
    return formattedPosts;
  }
}

export default getMyPosts;