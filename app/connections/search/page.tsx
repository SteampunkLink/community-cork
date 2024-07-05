import UserCardList from "@/components/usercards/UserCardList";
import getUsersBySearch from "@/config/queries/getUsersBySearch";

// /connections/search
const SearchPage = async ({
  searchParams,
}: {
  searchParams: { searchTerm: string };
}) => {
  const formattedUsers = await getUsersBySearch(searchParams.searchTerm);
  return (
    <div>
      <UserCardList
        title={`Search results page with ${searchParams.searchTerm}`}
        userList={formattedUsers}
      />
    </div>
  );
};

export default SearchPage;
