"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import archivePost from "@/config/actions/archivePost";
import deletePost from "@/config/actions/deletePost";
import unfollowUser from "@/config/actions/unfollowUser";

const Modal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  const router = useRouter();
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    if (modal === "archive") {
      setModalText("Do you wish to archive this post?");
    } else if (modal === "deletePost") {
      setModalText("Do you wish to delete this post?");
    } else if (modal === "unfollow") {
      setModalText("Are you sure you want to unfollow this user?");
    } else {
      setModalText("");
    }
  }, [modal]);

  const onConfirm = async () => {
    if (modal === "archive") {
      const post = searchParams.get("post");
      if (post) {
        await archivePost(post);
        router.push(pathname);
      }
    } else if (modal === "deletePost") {
      const post = searchParams.get("post");
      if (post) {
        await deletePost(post);
        router.push(pathname);
      }
    } else if (modal === "unfollow") {
      const user = searchParams.get("user");
      if (user) {
        await unfollowUser(user);
        router.push(pathname);
      }
    }
  };

  return modalText ? (
    <div className="fixed left-0 top-0 w-full h-full bg-black/50 z-20 overflow-auto flex justify-center items-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <p>{modalText}</p>
        <Link href={pathname}>
          <button>Cancel</button>
        </Link>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
