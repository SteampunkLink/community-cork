import PostNote, { INotePostData } from "./PostNote";
import PostForm from "./PostForm";

interface IPostBoardProps {
  title: string;
  posts: INotePostData[];
  isFormVisable: boolean;
}

const PostBoard = ({ title, posts, isFormVisable }: IPostBoardProps) => {
  return (
    <>
      <h3 className="text-lg text-center text-white font-bold">{title}</h3>
      <div className="flex flex-row flex-wrap justify-evenly">
        {isFormVisable ? <PostForm /> : null}
        {posts.length === 0 ? (
          <p>No Posts to display</p>
        ) : (
          <>
            {posts.map((post) => (
              <PostNote key={post.postId} postData={post} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PostBoard;
