import connectDB from "../db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

async function getMyProfileData() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const myUserData = await User.findById(sessionUser.userId).select(["profile", "options"]);

    return myUserData;
  }
}

export default getMyProfileData;