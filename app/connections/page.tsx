import getMyConnections from "@/config/queries/getMyConnections";
import UserCard from "@/components/usercards/UserCard";

const ConnectionsPage = async () => {
  const myConnections = await getMyConnections();
  return (
    <div>
      <h3>Mutual</h3>
      {myConnections.relationships.mutual.map((friend: any) => (
        <div key={friend._id}>
          <UserCard
            uid={friend._id}
            profile={friend.profile}
            image={friend.image}
          />
        </div>
      ))}
      <h3>My Followers</h3>
      {myConnections.relationships.followers.map((follower: any) => (
        <div key={follower._id}>
          <UserCard
            uid={follower._id}
            profile={follower.profile}
            image={follower.image}
          />
        </div>
      ))}
      <h3>I'm Following</h3>
      {myConnections.relationships.following.map((following: any) => (
        <div key={following._id}>
          <UserCard
            uid={following._id}
            profile={following.profile}
            image={following.image}
          />
        </div>
      ))}
    </div>
  );
};

export default ConnectionsPage;
