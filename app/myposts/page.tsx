import getMyPosts from "@/config/queries/getMyPosts";
import PostBoard from "@/components/post/PostBoard";

// /myposts
const MyPostsPage = async () => {
  const myPosts = await getMyPosts();
  return (
    <>
      <PostBoard
        title={"My Posts"}
        posts={myPosts.filter((post) => post.status === "pinned")}
        isFormVisable={true}
      />
      <PostBoard
        title={"My Archive"}
        posts={myPosts.filter((post) => post.status === "archive")}
        isFormVisable={false}
      />
      <PostBoard
        title={"My Liked Posts"}
        posts={myPosts.filter((post) => post.status === "liked")}
        isFormVisable={false}
      />
    </>
  );
};

export default MyPostsPage;
