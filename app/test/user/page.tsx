import Link from "next/link";
import connectDB from "@/config/db";
import User, { IUserWithId } from "@/models/User";
import UserCard from "@/components/usercards/UserCard";

const AllUsers = async () => {
  await connectDB();
  const users = await User.find({});
  return (
    <>
      {users.length > 0 ? (
        <div>
          {users.map((user: IUserWithId) => (
            // <Link href={`/user/${user._id}`} key={user._id}>
            <UserCard
              key={user._id}
              uid={user._id}
              profile={user.profile}
              image={user.image}
            />
            // </Link>
          ))}
        </div>
      ) : (
        <p>No users to display</p>
      )}
    </>
  );
};

export default AllUsers;
