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
    const myBlacklist = await User.findById(sessionUser.userId).select("options.blacklist");

    let query = {
      $and: [
        { _id: { $nin: myBlacklist.options.blacklist } },
        {
          $or: [
            { email: searchPattern },
            { "profile.name": searchPattern },
            { "profile.displayname": searchPattern },
          ]
        },
        { "options.isProfileSearchable": true }
      ]

    }
    const foundUsers = await User.find(query);
    const formattedUsers = foundUsers.filter((user) => !user.options.blacklist.includes(sessionUser.userId)).map((user) => ({
      uid: user._id,
      image: user.image,
      displayname: user.profile.displayname || user.username,
      bio: user.profile.bio,
      relation: user._id.toString() === sessionUser.userId ? "Me" :
        user.relationships.mutual.includes(sessionUser.userId) ? "Mutual" :
          user.relationships.followers.includes(sessionUser.userId) ? "You Follow" :
            user.relationships.following.includes(sessionUser.userId) ? "Follows You" :
              "None"
    }))
    return formattedUsers;
  }

}

export default getUsersBySearch;