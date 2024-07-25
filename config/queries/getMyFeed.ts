import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
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
        { $and: [{ user: { $in: followedUsers } }, { visibility: "everyone" }] },
        { $and: [{ user: { $in: mutualFollows } }, { visibility: { $ne: "private" } }] }
      ],
      status: "pinned"
    }).populate("user");

    const formattedPosts = postsFromFollowed.map((post) => ({
      postId: post._id,
      posterId: post.user._id,
      user: post.user.profile.displayname,
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