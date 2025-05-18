import UserService from "@/services/user/UserService";
import HomeView from "@/views/home/HomeView";

export default async function Home() {
  const result = await UserService.get();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <HomeView user={result.data} />;
}
