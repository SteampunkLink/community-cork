"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import deletePost from "@/config/actions/deletePost";
import Modal from "../Modal";

const DeleteBtn = ({ postId }: { postId: string }) => {
  const [showTrashModal, setShowTrashModal] = useState(false);
  const onConfirm = async () => {
    await deletePost(postId);
    setShowTrashModal(false);
  };
  return (
    <>
      <FaTrash
        onClick={() => setShowTrashModal(true)}
        className="mx-1 cursor-pointer transition duration-300 hover:text-white"
      />
      {showTrashModal ? (
        <Modal>
          <>
            <p className="text-lg text-center mb-3">
              Are you sure you want to delete this post? This cannot be undone.
              (Note: If you need to make more space but want to keep this, you
              can archive it instead.)
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                onClick={() => setShowTrashModal(false)}
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

export default DeleteBtn;
