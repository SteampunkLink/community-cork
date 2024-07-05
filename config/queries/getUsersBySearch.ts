import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

const getUsersBySearch = async (term: string) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.user) {
    throw new Error("No User Found");
  } else {
    const searchPattern = new RegExp(term, "i");
    let query = {
      $or: [
        { email: searchPattern },
        { username: searchPattern },
        { "profile.name": searchPattern },
        { "profile.displayname": searchPattern },
      ]
    }
    const foundUsers = await User.find(query);
    const formattedUsers = foundUsers.map((user) => ({
      uid: user._id,
      name: user.username,
      image: user.image,
      displayname: user.profile.displayname || user.username,
      bio: user.profile.bio,
      relation: user._id === sessionUser.userId ? "Me" :
        user.relationships.mutual.includes(sessionUser.userId) ? "Mutual" :
          user.relationships.followers.includes(sessionUser.userId) ? "Follows You" :
            user.relationships.following.includes(sessionUser.userId) ? "Following" :
              "None"
    }))
    return formattedUsers;
  }

}

export default getUsersBySearch;