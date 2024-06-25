import Image from "next/image";
import Link from "next/link";
import UserCardBtn from "./UserCardBtn";

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
        <div>
          <UserCardBtn btnText={"Follow Me"} />
          <Link href={`/user/${uid}`}>
            <UserCardBtn btnText={"My Profile"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
