import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import User from "@/models/User";
import Post from "@/models/Post";

const getMyFeed = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const myData = await User.findById(sessionUser.userId);
    const followedUsers = myData.relationships.following;
    const mutualFollows = myData.relationships.mutual;

    const postsFromFollowed = await Post.find({
      $or: [
        { user: sessionUser.userId },
        { user: { $in: followedUsers } },
        { user: { $in: mutualFollows } }
      ]
    }).populate("user");

    const formattedPosts = postsFromFollowed.map((post) => ({
      postId: post._id,
      posterId: post.user._id,
      user: post.user.username,
      image: post.user.image,
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

export default getMyFeed;