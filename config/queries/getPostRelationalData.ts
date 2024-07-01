import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import Post from "@/models/Post";

const getPostRelationalData = async (postId: string) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  let result = { isMine: false, isLikedByMe: false };
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const relevantPost = await Post.findById(postId);
    if (relevantPost.user.toString() === sessionUser.userId) {
      result.isMine = true;
    }
    if (relevantPost.likes.includes(sessionUser.userId)) {
      result.isLikedByMe = true;
    }
  }
  return result;
}

export default getPostRelationalData;