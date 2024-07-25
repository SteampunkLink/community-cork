"use client";

import { useState } from "react";
import unfollowUser from "@/config/actions/unfollowUser";
import Modal from "../Modal";

interface IUnfollowBtnProps {
  userId: string;
  userName: string;
}

const UnfollowBtn = ({ userId, userName }: IUnfollowBtnProps) => {
  const [showModal, setShowModal] = useState(false);
  const onConfirm = async () => {
    await unfollowUser(userId);
    setShowModal(false);
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-slate-400 p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300"
      >
        Unfollow
      </button>
      {showModal ? (
        <Modal>
          <>
            <p className="text-lg text-center mb-3">
              Are you sure you want to unfollow {userName}?
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-300 p-3 w-2/5 transition duration-300 text-center hover:bg-slate-600 hover:text-white"
              >
                Cancel
              </button>
              <button
                className="bg-red-500 p-3 w-2/5 transition duration-300 hover:bg-red-800 hover:text-white"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </>
        </Modal>
      ) : null}
    </>
  );
};

export default UnfollowBtn;
