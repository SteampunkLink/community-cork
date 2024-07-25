import Image from "next/image";
import Link from "next/link";

import followUser from "@/config/actions/followUser";
import UnfollowBtn from "./UnfollowBtn";

export interface IUserCardProps {
  uid: string;
  image: string;
  displayname: string;
  bio: string;
  relation: string;
}

const UserCard = ({
  uid,
  image,
  displayname,
  bio,
  relation,
}: IUserCardProps) => {
  return (
    <div className="flex flex-row bg-pink-800 m-5 p-2 rounded-lg justify-evenly">
      <Image
        className="w-1/6 rounded-full"
        src={image}
        alt="Profile Image"
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-center w-4/6 text-center">
        <h3 className="text-xl font-bold mb-3">{displayname}</h3>
        <p>{bio}</p>
        <div className="flex flex-row">
          {relation === "None" || relation === "Follows You" ? (
            <form action={followUser}>
              <input
                id="userToFollowId"
                name="userToFollowId"
                type="hidden"
                value={uid}
              />
              <button
                type="submit"
                className="bg-slate-400 p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300"
              >
                {relation === "Follows You" ? "Follow Me Back" : "Follow Me"}
              </button>
            </form>
          ) : null}
          {relation === "Mutual" || relation === "You Follow" ? (
            <UnfollowBtn userId={uid} userName={displayname} />
          ) : null}
          {relation === "Me" ? (
            <Link href="/settings">
              <button className="bg-slate-400 p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300">
                Edit My Settings
              </button>
            </Link>
          ) : (
            <Link href={`/user/${uid}`}>
              <button className="bg-slate-400 p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300">
                My Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
