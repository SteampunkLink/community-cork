"use client";

import { useState } from "react";
import unBlacklistUser from "@/config/actions/unblacklistUser";
import Modal from "../Modal";

interface IBlacklistRemoveBtnProps {
  userId: string;
  userName: string;
}

const BlacklistRemoveBtn = ({ userId, userName }: IBlacklistRemoveBtnProps) => {
  const [showUnBlackListModal, setShowUnBshowUnBlackListModal] =
    useState(false);
  const onConfirm = async () => {
    await unBlacklistUser(userId);
    setShowUnBshowUnBlackListModal(false);
  };
  return (
    <>
      <button
        onClick={() => setShowUnBshowUnBlackListModal(true)}
        className="bg-[#ec8d9a] text-black p-2 rounded shadow-sm hover:bg-slate-300"
      >
        Remove from Blacklist?
      </button>
      {showUnBlackListModal ? (
        <Modal>
          <>
            <p className="text-lg text-center mb-3">
              Are you sure you want to remove {userName} from your blacklist?
              They will be able to see your profile again. Any previous
              relationship (following/follower/mutual) will NOT be restored.
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                onClick={() => setShowUnBshowUnBlackListModal(false)}
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

export default BlacklistRemoveBtn;
