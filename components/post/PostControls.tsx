import getPostRelationalData from "@/config/queries/getPostRelationalData";
import PostLikeBtn from "./PostLikeBtn";
import ArchiveBtn from "./ArchiveBtn";
import DeleteBtn from "./DeleteBtn";

interface IPostControlsProps {
  postId: string;
}

const PostControls = async ({ postId }: IPostControlsProps) => {
  const { isMine, isLikedByMe } = await getPostRelationalData(postId);
  return (
    <div className="flex flex-row items-center">
      <PostLikeBtn postId={postId.toString()} isLikedByMe={isLikedByMe} />
      {isMine ? (
        <>
          <ArchiveBtn postId={postId.toString()} />
          <DeleteBtn postId={postId.toString()} />
        </>
      ) : null}
    </div>
  );
};

export default PostControls;
