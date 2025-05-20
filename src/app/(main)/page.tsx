import UserQueryService from "@/services/user/QueryService";
import HomeView from "@/views/home/HomeView";

const HomePage = async () => {
  const result = await UserQueryService.get();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <HomeView user={result.data} />;
};

export default HomePage;
