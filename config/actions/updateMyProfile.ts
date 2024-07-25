"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "../db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function updateMyProfile(formData: FormData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const userToUpdate = await User.findById(sessionUser.userId);

  userToUpdate.profile.name = formData.get("name") || userToUpdate.profile.name;
  userToUpdate.profile.bio = formData.get("bio") || userToUpdate.profile.bio;

  userToUpdate.save();
  revalidatePath("/", "layout");
  redirect("/profile");
}

export default updateMyProfile;