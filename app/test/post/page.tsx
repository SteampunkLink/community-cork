import connectDB from "@/config/db";
import Post from "@/models/Post";
import PostBoard from "@/components/post/PostBoard";

const AllPosts = async () => {
  await connectDB();
  const posts = await Post.find({}).populate("user", "image profile");
  const formattedPosts = posts.map((post) => ({
    postId: post._id,
    user: post.user.profile.displayname,
    body: post.body,
    likes: post.likes.length,
    color: post.color,
    image: post.user.image,
    date: `${new Date(post.createdAt).getUTCMonth() + 1}/${new Date(
      post.createdAt
    ).getUTCDate()}/${new Date(post.createdAt).getUTCFullYear()}`,
  }));
  return (
    <>
      {posts.length > 0 ? (
        <PostBoard isFormVisable={false} posts={formattedPosts} />
      ) : (
        <p>No users to display</p>
      )}
    </>
  );
};

export default AllPosts;
