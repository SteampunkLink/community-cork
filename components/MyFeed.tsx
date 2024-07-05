import PostBoard from "@/components/post/PostBoard";
import getMyFeed from "@/config/queries/getMyFeed";

const MyFeed = async () => {
  const myFeed = await getMyFeed();
  return <PostBoard title={"My Feed"} posts={myFeed} isFormVisable={true} />;
};

export default MyFeed;
