import UserQueryService from "@/services/user/QueryService";
import HomeView from "@/views/home/HomeView";

const HomePage = async () => {
  const result = await UserQueryService.get();
  return <HomeView user={result} />;
};

export default HomePage;
