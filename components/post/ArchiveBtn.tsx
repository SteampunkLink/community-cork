"use client";

import { useState } from "react";
import { FaArchive } from "react-icons/fa";
import archivePost from "@/config/actions/archivePost";
import Modal from "../Modal";

const ArchiveBtn = ({ postId }: { postId: string }) => {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const onConfirm = async () => {
    await archivePost(postId);
    setShowArchiveModal(false);
  };
  return (
    <>
      <FaArchive
        onClick={() => setShowArchiveModal(true)}
        className="mx-1 cursor-pointer transition duration-300 hover:text-white"
      />
      {showArchiveModal ? (
        <Modal>
          <>
            <p className="text-lg text-center mb-3">
              Are you sure you want to archive this post? Users will still be
              able to see it in your profile, but it will no longer appear in
              feeds?
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                onClick={() => setShowArchiveModal(false)}
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

export default ArchiveBtn;
