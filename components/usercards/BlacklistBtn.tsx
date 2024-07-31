"use client";

import { useState } from "react";
import blacklistUser from "@/config/actions/blacklistUser";
import Modal from "../Modal";

interface IBlacklistBtnProps {
  userId: string;
  userName: string;
}

const BlacklistBtn = ({ userId, userName }: IBlacklistBtnProps) => {
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const onConfirm = async () => {
    await blacklistUser(userId);
    setShowBlacklistModal(false);
  };
  return (
    <>
      <button
        onClick={() => setShowBlacklistModal(true)}
        className="bg-[#ec8d9a] text-black p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300"
      >
        Add to Blacklist
      </button>
      {showBlacklistModal ? (
        <Modal>
          <>
            <p className="text-lg text-center mb-3">
              Are you sure you want to blacklist {userName}? You will no longer
              be able to see each other's profiles or posts and any existing
              relationships (following/follower/mutual) will be erased.
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                onClick={() => setShowBlacklistModal(false)}
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

export default BlacklistBtn;
