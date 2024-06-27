import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import User from "@/models/User";

// TODO - add types for return
async function getMyConnections() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const myConnections = await User.findById(sessionUser.userId)
      .populate("relationships.followers")
      .populate("relationships.following")
      .populate("relationships.mutual");

    return myConnections;
  }

}

export default getMyConnections;