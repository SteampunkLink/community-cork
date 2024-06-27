import Image from "next/image";
import Link from "next/link";

import followUser from "@/config/actions/followUser";

interface IUserCardProps {
  uid: string;
  profile: {
    name?: string;
    displayname?: string;
    bio?: string;
  };
  image: string;
}

const UserCard = ({ uid, profile, image }: IUserCardProps) => {
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
        <h3 className="text-xl font-bold mb-3">
          {profile.name} - {profile.displayname}
        </h3>
        <p>{profile.bio}</p>
        <div className="flex flex-row">
          <form action={followUser}>
            <input
              id="userToFollowId"
              name="userToFollowId"
              type="hidden"
              value={uid.toString()}
            />
            <button
              type="submit"
              className="bg-slate-400 p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300"
            >
              Follow Me
            </button>
          </form>
          <Link href={`/user/${uid}`}>
            <button className="bg-slate-400 p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300">
              My Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
