import PostBoard from "@/components/post/PostBoard";
import getMyFeed from "@/config/queries/getMyFeed";

const MyFeed = async () => {
  const { formattedPosts, myPostCount } = await getMyFeed();
  return (
    <PostBoard
      title={"My Feed"}
      posts={formattedPosts}
      isFormVisable={myPostCount < 12}
    />
  );
};

export default MyFeed;
