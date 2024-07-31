import PostBoard from "@/components/post/PostBoard";
import Blacklist from "@/components/usercards/Blacklist";
import UserCard from "@/components/usercards/UserCard";
import UserCardList from "@/components/usercards/UserCardList";
import getMyProfileData from "@/config/queries/getMyProfileData";

// /profile

const ProfilePage = async () => {
  const { myUserData, formattedPosts, blacklist } = await getMyProfileData();

  return (
    <div>
      <UserCard
        uid={myUserData.myData.uid}
        image={myUserData.myData.image}
        displayname={myUserData.myData.displayname}
        bio={myUserData.myData.bio}
        relation={"Me"}
      />
      <PostBoard
        posts={formattedPosts.filter((post) => post.status === "pinned")}
        isFormVisable={false}
        title={"My Posts"}
      />
      <UserCardList title={"My Mutuals"} userList={myUserData.mutual} />
      <UserCardList title={"My Followers"} userList={myUserData.followers} />
      <UserCardList title={"I'm Following"} userList={myUserData.following} />
      <PostBoard
        posts={formattedPosts.filter((post) => post.status === "archive")}
        isFormVisable={false}
        title={"My Archive"}
      />
      <Blacklist blacklist={blacklist} />
    </div>
  );
};

export default ProfilePage;
