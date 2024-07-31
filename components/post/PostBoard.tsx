import PostNote, { INotePostData } from "./PostNote";
import PostForm from "./PostForm";

interface IPostBoardProps {
  title: string;
  posts: INotePostData[];
  isFormVisable: boolean;
  formRedirect?: string;
}

const PostBoard = ({
  title,
  posts,
  isFormVisable,
  formRedirect,
}: IPostBoardProps) => {
  return (
    <>
      <h3 className="text-2xl text-white font-bold">{title}</h3>
      <div className="flex flex-row flex-wrap justify-evenly">
        {isFormVisable ? <PostForm formRedirect={formRedirect || "/"} /> : null}
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
