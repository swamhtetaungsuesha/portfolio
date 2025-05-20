import SocialQueryService from "@/services/social/QueryService";
import UserQueryService from "@/services/user/QueryService";
import ContactView from "@/views/contact/ContactView";

const ContactPage = async () => {
  const userResult = await UserQueryService.get();
  const socialsResult = await SocialQueryService.getList();

  return <ContactView socials={socialsResult} user={userResult} />;
};

export default ContactPage;
