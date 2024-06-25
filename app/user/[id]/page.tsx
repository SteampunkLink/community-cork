import connectDB from "@/config/db";
import { getUserProfileData } from "@/config/queries/userProfilePage";
import UserCard from "@/components/usercards/UserCard";
import PostBoard from "@/components/post/PostBoard";

interface IParams {
  params: {
    id: string;
  };
}

const UserInfo = async ({ params }: IParams) => {
  await connectDB();
  const { foundUser, formattedPosts } = await getUserProfileData(params.id);
  return (
    <div>
      <h2>User Data</h2>
      <UserCard
        uid={foundUser._id}
        profile={foundUser.profile}
        image={foundUser.image}
      />
      <h3>My Posts</h3>
      <PostBoard posts={formattedPosts} isFormVisable={false} />
      <h3>Mutual</h3>
      {foundUser.relationships.mutual.map((friend: any) => (
        <div key={friend._id}>
          <UserCard
            uid={friend._id}
            profile={friend.profile}
            image={friend.image}
          />
        </div>
      ))}
      <h3>My Followers</h3>
      {foundUser.relationships.followers.map((follower: any) => (
        <div key={follower._id}>
          <UserCard
            uid={follower._id}
            profile={follower.profile}
            image={follower.image}
          />
        </div>
      ))}
      <h3>I'm Following</h3>
      {foundUser.relationships.following.map((following: any) => (
        <div key={following._id}>
          <UserCard
            uid={following._id}
            profile={following.profile}
            image={following.image}
          />
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
