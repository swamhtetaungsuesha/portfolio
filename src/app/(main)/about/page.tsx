import UserQueryService from "@/services/user/QueryService";
import AboutView from "@/views/about/AboutView";

const AboutPage = async () => {
  const result = await UserQueryService.get();
  return <AboutView user={result} />;
};

export default AboutPage;
