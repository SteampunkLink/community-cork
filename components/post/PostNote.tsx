import Image from "next/image";
import { INotePostData } from "./PostBoard";
import { FaHeart, FaRegHeart, FaArchive, FaTrash } from "react-icons/fa";

export const EmeraldNote = ({ postData }: { postData: INotePostData }) => {
  return (
    <div className="flex flex-col justify-between w-[250px] h-[250px] m-5 bg-emerald-200 border-emerald-600 border-2">
      <header className="flex flex-row justify-between bg-emerald-400 px-3">
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
      <p className="text-center px-2">{postData.body}</p>
      <footer className="flex flex-row justify-between bg-emerald-300 px-3">
        <p>
          {postData.likes} {postData.likes === 1 ? "Like" : "Likes"}
        </p>
        <div className="flex flex-row items-center">
          <FaHeart className="mx-1" />
          <FaArchive className="mx-1" />
          <FaTrash className="ml-1" />
        </div>
      </footer>
    </div>
  );
};

export const RoseNote = ({ postData }: { postData: INotePostData }) => {
  return (
    <div className="flex flex-col justify-between w-[250px] h-[250px] m-5 bg-rose-200 border-rose-600 border-2">
      <header className="flex flex-row justify-between bg-rose-400 px-3">
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
      <p className="text-center px-2">{postData.body}</p>
      <footer className="flex flex-row justify-between bg-rose-300 px-3">
        <p>
          {postData.likes} {postData.likes === 1 ? "Like" : "Likes"}
        </p>
        <div className="flex flex-row items-center">
          <FaHeart className="mx-1" />
          <FaArchive className="mx-1" />
          <FaTrash className="ml-1" />
        </div>
      </footer>
    </div>
  );
};

export const SkyNote = ({ postData }: { postData: INotePostData }) => {
  return (
    <div className="flex flex-col justify-between w-[250px] h-[250px] m-5 bg-sky-200 border-sky-600 border-2">
      <header className="flex flex-row justify-between bg-sky-400 px-3">
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
      <p className="text-center px-2">{postData.body}</p>
      <footer className="flex flex-row justify-between bg-sky-300 px-3">
        <p>
          {postData.likes} {postData.likes === 1 ? "Like" : "Likes"}
        </p>
        <div className="flex flex-row items-center">
          <FaHeart className="mx-1" />
          <FaArchive className="mx-1" />
          <FaTrash className="ml-1" />
        </div>
      </footer>
    </div>
  );
};

export const VioletNote = ({ postData }: { postData: INotePostData }) => {
  return (
    <div className="flex flex-col justify-between w-[250px] h-[250px] m-5 bg-violet-200 border-violet-600 border-2">
      <header className="flex flex-row justify-between bg-violet-400 px-3">
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
      <p className="text-center px-2">{postData.body}</p>
      <footer className="flex flex-row justify-between bg-violet-300 px-3">
        <p>
          {postData.likes} {postData.likes === 1 ? "Like" : "Likes"}
        </p>
        <div className="flex flex-row items-center">
          <FaHeart className="mx-1" />
          <FaArchive className="mx-1" />
          <FaTrash className="ml-1" />
        </div>
      </footer>
    </div>
  );
};
