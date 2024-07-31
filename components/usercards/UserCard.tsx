import Image from "next/image";
import Link from "next/link";

import UnfollowBtn from "@/components/usercards/UnfollowBtn";
import BlacklistBtn from "@/components/usercards/BlacklistBtn";
import FollowBtn from "./FollowBtn";

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
    <div className="flex flex-row bg-[#2d2d4f] text-slate-400 ml-5 p-2 rounded-lg justify-evenly max-h-[200px]">
      <Image
        className="w-1/6 min-w-24 rounded-full"
        src={image}
        alt="Profile Image"
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-center w-4/6 text-center">
        <h4 className="text-xl font-bold mb-3">{displayname}</h4>
        <div className="h-[80px] overflow-scroll">
          <p>{bio}</p>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            {relation === "None" || relation === "Follows You" ? (
              <FollowBtn userId={uid} relation={relation} />
            ) : null}
            {relation === "Mutual" || relation === "You Follow" ? (
              <UnfollowBtn userId={uid} userName={displayname} />
            ) : null}
            {relation === "Me" ? (
              <Link href="/settings">
                <button className="bg-[#8dc8ec] text-black p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300">
                  Edit My Settings
                </button>
              </Link>
            ) : (
              <>
                <Link href={`/user/${uid}`}>
                  <button className="bg-[#8dc8ec] text-black p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300">
                    My Profile
                  </button>
                </Link>
              </>
            )}
          </div>
          {relation !== "Me" ? (
            <BlacklistBtn userId={uid} userName={displayname} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
