import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";

// TODO - add types for return
export async function getMyPosts() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("No User Found");
  }
  const userId = sessionUser.userId;
  const posts = await Post.find({ user: userId, status: "pinned" });
  const formattedPosts = posts.map((post) => ({
    postId: post._id,
    user: sessionUser.user.name,
    body: post.body,
    likes: post.likes.length,
    color: post.color,
    date: `
      ${new Date(post.createdAt).getUTCMonth() + 1}/${new Date(post.createdAt).getUTCDate()}/${new Date(post.createdAt).getUTCFullYear()}
    `
  }))
  return formattedPosts;
}

// export async function getUserPosts(uid: string) {
//   await connectDB();
//   const posts = await Post.find({ user: uid });
//   const formattedPosts = posts.map((post) => ({
//     postId: post._id,
//     user: uid,
//     body: post.body,
//     likes: post.likes.length,
//     color: post.color,
//     date: `
//       ${new Date(post.createdAt).getUTCMonth() + 1}/${new Date(post.createdAt).getUTCDate()}/${new Date(post.createdAt).getUTCFullYear()} `
//   }));
//   return formattedPosts;
// }