import PostBoard from "@/components/post/PostBoard";
import UserCardList from "@/components/usercards/UserCardList";
import getMyProfileData from "@/config/queries/getMyProfileData";

// /profile
const ProfilePage = async () => {
  const myData = await getMyProfileData();
  return (
    <div>
      <PostBoard
        posts={myData.formattedPosts.filter((post) => post.status === "pinned")}
        isFormVisable={false}
        title={"My Posts"}
      />

      <UserCardList title={"My Mutuals"} userList={myData.myUserData.mutual} />

      <UserCardList
        title={"My Followers"}
        userList={myData.myUserData.followers}
      />

      <UserCardList
        title={"I'm Following"}
        userList={myData.myUserData.following}
      />

      <PostBoard
        posts={myData.formattedPosts.filter(
          (post) => post.status === "archive"
        )}
        isFormVisable={false}
        title={"My Archive"}
      />
    </div>
  );
};

export default ProfilePage;
