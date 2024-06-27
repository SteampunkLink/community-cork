import UserSearch from "@/components/UserSearch";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <h2>Search Users</h2>
      <UserSearch />
      {children}
    </div>
  );
};

export default layout;
