"use server";

import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import User from "@/models/User";

const checkUserStatus = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  }

  const loggedInUser = await User.findById(sessionUser.userId).select(["default", "profile"]);
  return loggedInUser.profile.displayname === `${loggedInUser.profile.name}-${loggedInUser.default}`;
}

export default checkUserStatus;