import getUserProfileData from "@/config/queries/getUserProfileData";
import UserCard from "@/components/usercards/UserCard";
import PostBoard from "@/components/post/PostBoard";
import UserCardList from "@/components/usercards/UserCardList";

interface IParams {
  params: {
    id: string;
  };
}

// /user/:id
const UserInfo = async ({ params }: IParams) => {
  const { foundUser, formattedPosts } = await getUserProfileData(params.id);
  return (
    <div>
      <h2 className="text-lg text-center text-white font-bold">User Data</h2>
      <UserCard
        uid={foundUser.myData.uid}
        image={foundUser.myData.image}
        name={foundUser.myData.name}
        displayname={foundUser.myData.displayname}
        bio={foundUser.myData.bio}
        relation={foundUser.myData.relation}
      />
      <PostBoard
        title={"My Posts"}
        posts={formattedPosts.filter((post) => post.status === "pinned")}
        isFormVisable={false}
      />

      <UserCardList title={"Mutual"} userList={foundUser.mutual} />
      <UserCardList title={"Followers"} userList={foundUser.followers} />
      <UserCardList title={"Following"} userList={foundUser.following} />
      <PostBoard
        title={"My Archive"}
        posts={formattedPosts.filter((post) => post.status === "archive")}
        isFormVisable={false}
      />
    </div>
  );
};

export default UserInfo;
