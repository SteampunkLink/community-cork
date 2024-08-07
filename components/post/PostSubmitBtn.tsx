"use client";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Modal from "../Modal";

const PostSubmitBtn = () => {
  const status = useFormStatus();
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit");
  const pathname = usePathname();
  return (
    <>
      <button
        className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold w-full focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={status.pending}
      >
        {status.pending ? "Adding Post..." : "Submit"}
      </button>
      {limit ? (
        <Modal>
          <h2>Post Limit Reached</h2>
          <p>
            If you want to create another post, you'll need to delete or archive
            an existing post first.
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

export default PostSubmitBtn;
