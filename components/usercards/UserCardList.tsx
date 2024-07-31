import UserCard, { IUserCardProps } from "./UserCard";

interface IUserCardListProps {
  title: string;
  userList: IUserCardProps[];
}

const UserCardList = ({ title, userList }: IUserCardListProps) => {
  return (
    <div>
      <h3 className="text-2xl text-white font-bold">{title}</h3>
      <div className="flex flex-col gap-y-[6px]">
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
      </div>
    </div>
  );
};

export default UserCardList;
