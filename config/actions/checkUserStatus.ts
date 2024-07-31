"use server";

import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import User from "@/models/User";

const checkUserStatus = async () => {

  await connectDB();
  const sessionUser = await getSessionUser();
  let showModal = false;
  if (sessionUser && sessionUser.userId) {
    const loggedInUser = await User.findById(sessionUser.userId).select(["default", "profile"]);
    showModal = loggedInUser.profile.displayname === `${loggedInUser.profile.name}-${loggedInUser.default}`;
  }
  return showModal;
}

export default checkUserStatus;