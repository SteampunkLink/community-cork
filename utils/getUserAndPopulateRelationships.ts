"use server";

import User from "@/models/User";
import mongoose from "mongoose";

interface IGetUserAndPopulateRelationshipsProps {
  userId: string;
  loggedInUserId: string;
}

interface IRelation {
  _id: string | mongoose.Types.ObjectId;
  username: string;
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
    .populate("relationships.followers", ["username", "profile", "image", "relationships"])
    .populate("relationships.following", ["username", "profile", "image", "relationships"])
    .populate("relationships.mutual", ["username", "profile", "image", "relationships"])

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
      name: userToFind.username,
      image: userToFind.image,
      displayname: userToFind.profile.displayname || userToFind.username,
      bio: userToFind.profile.bio,
      relation: getRelationToLoggedInUser()
    },
    mutual: userToFind.relationships.mutual.map((friend: IRelation) => ({
      uid: friend._id,
      name: friend.username,
      image: friend.image,
      displayname: friend.profile.displayname || friend.username,
      bio: friend.profile.bio,
      relation: friend._id.toString() === loggedInUserId ? "Me" :
        friend.relationships.mutual.includes(loggedInUserId) ? "Mutual" :
          friend.relationships.followers.includes(loggedInUserId) ? "You Follow" :
            friend.relationships.following.includes(loggedInUserId) ? "Follows You" :
              "None"
    })),
    followers: userToFind.relationships.followers.map((follower: IRelation) => ({
      uid: follower._id,
      name: follower.username,
      image: follower.image,
      displayname: follower.profile.displayname || follower.username,
      bio: follower.profile.bio,
      relation: follower._id.toString() === loggedInUserId ? "Me" :
        follower.relationships.mutual.includes(loggedInUserId) ? "Mutual" :
          follower.relationships.followers.includes(loggedInUserId) ? "You Follow" :
            follower.relationships.following.includes(loggedInUserId) ? "Follows You" :
              "None"
    })),
    following: userToFind.relationships.following.map((followed: IRelation) => ({
      uid: followed._id,
      name: followed.username,
      image: followed.image,
      displayname: followed.profile.displayname || followed.username,
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