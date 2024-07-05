import getMyConnections from "@/config/queries/getMyConnections";
import UserCardList from "@/components/usercards/UserCardList";

// /connections
const ConnectionsPage = async () => {
  const myConnections = await getMyConnections();
  return (
    <div>
      <UserCardList title="Mutual" userList={myConnections.mutual} />

      <UserCardList title="My Followers" userList={myConnections.followers} />

      <UserCardList title="I'm Following" userList={myConnections.following} />
    </div>
  );
};

export default ConnectionsPage;
