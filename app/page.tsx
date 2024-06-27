// import PostBoard from "@/components/post/PostBoard";
// import getMyFeed from "@/config/queries/getMyFeed";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import MyFeed from "@/components/MyFeed";
import About from "@/components/About";

const HomePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const homeView = sessionUser?.userId ? <MyFeed /> : <About />;
  return <>{homeView}</>;
};

export default HomePage;
