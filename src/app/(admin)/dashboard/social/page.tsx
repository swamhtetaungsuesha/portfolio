import SocialQueryService from "@/services/social/QueryService";
import SocialView from "@/views/admin/social/SocialView";

const SocialPage = async () => {
  const result = await SocialQueryService.getList();
  return <SocialView socials={result} />;
};

export default SocialPage;
