import * as Note from "./PostNote";
import PostForm from "./PostForm";

export interface INotePostData {
  postId: string;
  user: string;
  image: string;
  body: string;
  likes: number;
  color: string;
  date: string;
}

interface IPostBoardProps {
  posts: INotePostData[];
  isFormVisable: boolean;
}

const PostBoard = ({ posts, isFormVisable }: IPostBoardProps) => {
  return (
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
  );
};

export default PostBoard;
