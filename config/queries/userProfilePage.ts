import connectDB from "../db";
import User from "@/models/User";
import Post from "@/models/Post";

export async function getUserProfileData(uid: string) {
  await connectDB();
  const foundUser = await User.findById(uid).populate("relationships.followers").populate("relationships.following").populate("relationships.mutual");

  await connectDB();
  const posts = await Post.find({ user: uid });
  const formattedPosts = posts.map((post) => ({
    postId: post._id,
    posterId: foundUser._id,
    user: foundUser.username,
    image: foundUser.image,
    body: post.body,
    likes: post.likes.length,
    color: post.color,
    date: `
      ${new Date(post.createdAt).getUTCMonth() + 1}/${new Date(post.createdAt).getUTCDate()}/${new Date(post.createdAt).getUTCFullYear()} `
  }));

  return { foundUser, formattedPosts }
}