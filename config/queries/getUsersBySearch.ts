import User from "@/models/User";

const getUsersBySearch = async (term: string) => {
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
    profile: {
      name: user.username,
      displayname: user.profile.displayname,
      bio: user.profile.bio,
    },
    image: user.image
  }))
  return formattedUsers;
}

export default getUsersBySearch;