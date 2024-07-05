import * as Note from "./PostNote";
import PostForm from "./PostForm";

interface IPostBoardProps {
  title: string;
  posts: Note.INotePostData[];
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
            {posts.map((post) =>
              post.color === "emerald" ? (
                <Note.EmeraldNote key={post.postId} postData={post} />
              ) : post.color === "sky" ? (
                <Note.SkyNote key={post.postId} postData={post} />
              ) : post.color === "violet" ? (
                <Note.VioletNote key={post.postId} postData={post} />
              ) : post.color === "rose" ? (
                <Note.RoseNote key={post.postId} postData={post} />
              ) : null
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PostBoard;
