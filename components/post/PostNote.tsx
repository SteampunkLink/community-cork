import Image from "next/image";
import Link from "next/link";
import PostControls from "./PostControls";

export interface INotePostData {
  postId: string;
  posterId: string;
  user: string;
  image: string;
  body: string;
  likes: number;
  color: string;
  date: string;
}

const PostNote = ({ postData }: { postData: INotePostData }) => {
  return (
    <div
      className={`flex flex-col justify-between w-[250px] h-[250px] m-5 bg-${postData.color}-200 border-${postData.color}-600 border-2`}
    >
      <Link href={`/user/${postData.posterId}`}>
        <header
          className={`flex flex-row justify-between bg-${postData.color}-400 px-3`}
        >
          <Image
            className="rounded"
            src={postData.image}
            alt="Profile Image"
            width={50}
            height={50}
          />
          <div className="text-right">
            <h3 className="font-bold">{postData.user}</h3>
            <p>{postData.date}</p>
          </div>
        </header>
      </Link>
      <p className="text-center px-2">{postData.body}</p>
      <footer
        className={`flex flex-row justify-between bg-${postData.color}-300 px-3`}
      >
        <p>
          {postData.likes} {postData.likes === 1 ? "Like" : "Likes"}
        </p>
        <PostControls postId={postData.postId} />
      </footer>
    </div>
  );
};

export default PostNote;
