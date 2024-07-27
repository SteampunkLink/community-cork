"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import togglePostLike from "@/config/actions/togglePostLike";

interface IPostLikeBtnProps {
  postId: string;
  isLikedByMe: boolean;
}

const PostLikeBtn = ({ postId, isLikedByMe }: IPostLikeBtnProps) => {
  return (
    <>
      {isLikedByMe ? (
        <FaHeart className="mx-1" onClick={() => togglePostLike(postId)} />
      ) : (
        <FaRegHeart className="mx-1" onClick={() => togglePostLike(postId)} />
      )}
    </>
  );
};

export default PostLikeBtn;
