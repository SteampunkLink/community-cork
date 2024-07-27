import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";
import { INotePostData } from "@/components/post/PostNote";

async function getMyPosts(): Promise<INotePostData[]> {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.user) {
    throw new Error("No User Found");
  } else {
    const userId = sessionUser.userId;
    const posts = await Post.find({ $or: [{ user: userId }, { likes: userId, status: "pinned" }] }).populate("user").sort({ createdAt: -1 });

    const formattedPosts = posts.map((post) => ({
      status: post.user._id.toString() === userId ? post.status : "liked",
      postId: post._id,
      posterId: post.user._id,
      user: post.user.profile.displayname!,
      image: post.user.image!,
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