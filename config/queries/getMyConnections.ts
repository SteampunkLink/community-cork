import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "../db";
import getUserAndPopulateRelationships from "@/utils/getUserAndPopulateRelationships";

// TODO - add types for return
async function getMyConnections() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("No User Found");
  } else {
    const myConnections = await getUserAndPopulateRelationships({
      userId: sessionUser.userId,
      loggedInUserId: sessionUser.userId
    });
    return myConnections;
  }

}

export default getMyConnections;