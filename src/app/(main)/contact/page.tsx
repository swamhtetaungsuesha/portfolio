import SocialQueryService from "@/services/social/QueryService";
import UserQueryService from "@/services/user/QueryService";
import ContactView from "@/views/contact/ContactView";

const ContactPage = async () => {
  const userResult = await UserQueryService.get();
  const socialsResult = await SocialQueryService.getList();
  if (!userResult.success || !socialsResult.success) {
    return <div>505 Server Error</div>;
  }
  return <ContactView socials={socialsResult.data} user={userResult.data} />;
};

export default ContactPage;
