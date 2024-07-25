"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function toggleIsProfileSearchable() {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const userToUpdate = await User.findById(sessionUser.userId);

  userToUpdate.options.isProfileSearchable = !userToUpdate.options.isProfileSearchable;
  await userToUpdate.save();
  revalidatePath("/", "layout");
}

export default toggleIsProfileSearchable;