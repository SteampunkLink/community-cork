import getMyPosts from "@/config/queries/getMyPosts";
import PostBoard from "@/components/post/PostBoard";

const MyPostsPage = async () => {
  const myPosts = await getMyPosts();
  return <PostBoard posts={myPosts} isFormVisable={true} />;
};

export default MyPostsPage;
