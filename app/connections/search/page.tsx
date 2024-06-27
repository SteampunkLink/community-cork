import UserCard from "@/components/usercards/UserCard";
import getUsersBySearch from "@/config/queries/getUsersBySearch";

const page = async ({
  searchParams,
}: {
  searchParams: { searchTerm: string };
}) => {
  const formattedUsers = await getUsersBySearch(searchParams.searchTerm);
  return (
    <div>
      <h2>Search Results page with {searchParams.searchTerm}</h2>
      {formattedUsers.map((user) => (
        <UserCard
          key={user.uid}
          uid={user.uid}
          profile={user.profile}
          image={user.image}
        />
      ))}
    </div>
  );
};

export default page;
