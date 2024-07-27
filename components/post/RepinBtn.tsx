"use client";

import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";
import { useSearchParams, usePathname } from "next/navigation";
import repinPost from "@/config/actions/repinPost";
import Modal from "../Modal";

const RepinBtn = ({ postId }: { postId: string }) => {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit");
  const pathname = usePathname();
  const handleRepin = async () => {
    await repinPost(postId, pathname);
  };
  return (
    <>
      <FaThumbtack
        onClick={() => handleRepin()}
        className="mx-1 cursor-pointer transition duration-300 hover:text-white"
      />
      {limit ? (
        <Modal>
          <h2>Post Limit Reached</h2>
          <p>
            If you want to repin this post, you'll need to delete or archive a
            currently pinned post first.
          </p>
          <Link href={pathname}>
            <button className="bg-slate-300 p-3 w-2/5 transition duration-300 text-center hover:bg-slate-600 hover:text-white">
              Got it!
            </button>
          </Link>
        </Modal>
      ) : null}
    </>
  );
};

export default RepinBtn;
