import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import Post from "@/models/Post";
import getUserAndPopulateRelationships from "@/utils/getUserAndPopulateRelationships";

async function getMyProfileData() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const myUserData = await getUserAndPopulateRelationships({ userId: sessionUser.userId, loggedInUserId: sessionUser.userId });

    const posts = await Post.find({ user: sessionUser.userId });

    const formattedPosts = posts.map((post) => ({
      status: post.status,
      postId: post._id,
      posterId: myUserData.myData.uid,
      user: myUserData.myData.displayname,
      image: myUserData.myData.image,
      body: post.body,
      likes: post.likes.length,
      color: post.color,
      date: `
      ${new Date(post.createdAt).getUTCMonth() + 1}/${new Date(post.createdAt).getUTCDate()}/${new Date(post.createdAt).getUTCFullYear()} `
    }));
    return { myUserData, formattedPosts }
  }
}

export default getMyProfileData;