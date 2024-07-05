"use client";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import togglePostLike from "@/config/actions/togglePostLike";

interface IPostLikeBtnProps {
  postId: string;
  isLikedByMe: boolean;
}

const PostLikeBtn = ({ postId, isLikedByMe }: IPostLikeBtnProps) => {
  const [isLiked, setIsLiked] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLiked(isLikedByMe);
  }, []);

  const handleClick = async () => {
    const newLikeStatus = await togglePostLike(postId);
    setIsLiked(newLikeStatus);
  };

  return (
    <>
      {isLiked ? (
        <FaHeart className="mx-1" onClick={handleClick} />
      ) : (
        <FaRegHeart className="mx-1" onClick={handleClick} />
      )}
    </>
  );
};

export default PostLikeBtn;
