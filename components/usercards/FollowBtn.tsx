"use client";

import followUser from "@/config/actions/followUser";

interface IFollowBtnProps {
  userId: string;
  relation: string;
}

const FollowBtn = ({ userId, relation }: IFollowBtnProps) => {
  const onConfirm = async () => {
    await followUser(userId);
  };
  return (
    <>
      <button
        onClick={() => onConfirm()}
        className="bg-[#e8ec8d] text-black p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300"
      >
        {relation === "Follows You" ? "Follow Me Back" : "Follow Me"}
      </button>
    </>
  );
};

export default FollowBtn;
