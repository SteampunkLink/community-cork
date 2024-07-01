import Link from "next/link";
import { FaArchive, FaTrash } from "react-icons/fa";
import getPostRelationalData from "@/config/queries/getPostRelationalData";
import PostLikeBtn from "./PostLikeBtn";

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
          <Link href={`?modal=archive&post=${postId}`}>
            <FaArchive className="mx-1" />
          </Link>
          <Link href={`?modal=deletePost&post=${postId}`}>
            <FaTrash className="ml-1" />
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default PostControls;
