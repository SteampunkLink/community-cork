import connectDB from "@/config/db";
import User from "@/models/User";
import UserCard from "@/components/usercards/UserCard";

const AllUsers = async () => {
  await connectDB();
  const users = await User.find({});
  return (
    <>
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <UserCard
              key={user._id}
              uid={user._id}
              image={user.image}
              name={user.profile.name}
              displayname={user.profile.displayname}
              bio={user.profile.bio}
              relation="n/a"
            />
          ))}
        </div>
      ) : (
        <p>No users to display</p>
      )}
    </>
  );
};

export default AllUsers;
