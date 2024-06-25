"use client";
import { useFormStatus } from "react-dom";

const PostSubmitBtn = () => {
  const status = useFormStatus();
  return (
    <button
      className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold w-full focus:outline-none focus:shadow-outline"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? "Adding Post..." : "Submit"}
    </button>
  );
};

export default PostSubmitBtn;
