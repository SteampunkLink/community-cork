"use server";

import User from "@/models/User";
import mongoose from "mongoose";

interface IGetUserAndPopulateRelationshipsProps {
  userId: string;
  loggedInUserId: string;
}

interface IRelation {
  _id: string | mongoose.Types.ObjectId;
  image: string;
  profile: {
    name?: string;
    displayname?: string;
    bio?: string;
  }
  relationships: {
    mutual: string[],
    followers: string[],
    following: string[],
  }
}

const getUserAndPopulateRelationships = async ({ userId, loggedInUserId }: IGetUserAndPopulateRelationshipsProps) => {

  const userToFind = await User.findById(userId)
    .populate("relationships.followers", ["profile", "image", "relationships"])
    .populate("relationships.following", ["profile", "image", "relationships"])
    .populate("relationships.mutual", ["profile", "image", "relationships"])

  const getRelationToLoggedInUser = () => {
    let userRelation = "None";
    userToFind.relationships.followers.map((follower: any) => {
      if (follower._id.toString() === loggedInUserId) { userRelation = "You Follow" }
    })
    userToFind.relationships.following.map((follower: any) => {
      if (follower._id.toString() === loggedInUserId) { userRelation = "Follows You" }
    })
    userToFind.relationships.mutual.map((follower: any) => {
      if (follower._id.toString() === loggedInUserId) { userRelation = "Mutual" }
    })
    return userRelation;
  }

  return {
    myData: {
      uid: userId,
      image: userToFind.image,
      displayname: userToFind.profile.displayname,
      bio: userToFind.profile.bio,
      relation: getRelationToLoggedInUser()
    },
    mutual: userToFind.relationships.mutual.map((friend: IRelation) => ({
      uid: friend._id,
      image: friend.image,
      displayname: friend.profile.displayname,
      bio: friend.profile.bio,
      relation: friend._id.toString() === loggedInUserId ? "Me" :
        friend.relationships.mutual.includes(loggedInUserId) ? "Mutual" :
          friend.relationships.followers.includes(loggedInUserId) ? "You Follow" :
            friend.relationships.following.includes(loggedInUserId) ? "Follows You" :
              "None"
    })),
    followers: userToFind.relationships.followers.map((follower: IRelation) => ({
      uid: follower._id,
      image: follower.image,
      displayname: follower.profile.displayname,
      bio: follower.profile.bio,
      relation: follower._id.toString() === loggedInUserId ? "Me" :
        follower.relationships.mutual.includes(loggedInUserId) ? "Mutual" :
          follower.relationships.followers.includes(loggedInUserId) ? "You Follow" :
            follower.relationships.following.includes(loggedInUserId) ? "Follows You" :
              "None"
    })),
    following: userToFind.relationships.following.map((followed: IRelation) => ({
      uid: followed._id,
      image: followed.image,
      displayname: followed.profile.displayname,
      bio: followed.profile.bio,
      relation: followed._id.toString() === loggedInUserId ? "Me" :
        followed.relationships.mutual.includes(loggedInUserId) ? "Mutual" :
          followed.relationships.followers.includes(loggedInUserId) ? "You Follow" :
            followed.relationships.following.includes(loggedInUserId) ? "Follows You" :
              "None"
    })),
  }
}

export default getUserAndPopulateRelationships;