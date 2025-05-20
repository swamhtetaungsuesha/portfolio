import SocialQueryService from "@/services/social/QueryService";
import SocialView from "@/views/admin/social/SocialView";

const SocialPage = async () => {
  const result = await SocialQueryService.getList();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <SocialView socials={result.data} />;
};

export default SocialPage;
