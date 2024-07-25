import UserCard, { IUserCardProps } from "./UserCard";

interface IUserCardListProps {
  title: string;
  userList: IUserCardProps[];
}

const UserCardList = ({ title, userList }: IUserCardListProps) => {
  return (
    <>
      <h3 className="text-xl text-center text-white font-bold">{title}</h3>

      {userList.map((friend: IUserCardProps) => (
        <div key={friend.uid.toString()}>
          <UserCard
            uid={friend.uid.toString()}
            image={friend.image}
            displayname={friend.displayname}
            bio={friend.bio}
            relation={friend.relation}
          />
        </div>
      ))}
    </>
  );
};

export default UserCardList;
