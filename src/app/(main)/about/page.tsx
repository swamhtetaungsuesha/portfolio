import UserService from "@/services/user/UserService";
import AboutView from "@/views/about/AboutView";

const Page = async () => {
  const result = await UserService.get();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <AboutView user={result.data} />;
};

export default Page;
