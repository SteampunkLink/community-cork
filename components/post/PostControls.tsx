import getPostRelationalData from "@/config/queries/getPostRelationalData";
import PostLikeBtn from "./PostLikeBtn";
import ArchiveBtn from "./ArchiveBtn";
import RepinBtn from "./RepinBtn";
import DeleteBtn from "./DeleteBtn";

interface IPostControlsProps {
  postId: string;
  postStatus: string;
}

const PostControls = async ({ postId, postStatus }: IPostControlsProps) => {
  const { isMine, isLikedByMe } = await getPostRelationalData(postId);
  return (
    <div className="flex flex-row items-center">
      <PostLikeBtn postId={postId.toString()} isLikedByMe={isLikedByMe} />
      {isMine ? (
        <>
          {postStatus === "pinned" ? (
            <ArchiveBtn postId={postId.toString()} />
          ) : (
            <RepinBtn postId={postId.toString()} />
          )}
          <DeleteBtn postId={postId.toString()} />
        </>
      ) : null}
    </div>
  );
};

export default PostControls;
