import SocialService from "@/services/social/SocialService";
import UserService from "@/services/user/UserService";
import ContactView from "@/views/contact/ContactView";

const ContactPage = async () => {
  const userResult = await UserService.get();
  const socialsResult = await SocialService.getList();
  if (!userResult.success || !socialsResult.success) {
    return <div>505 Server Error</div>;
  }
  return <ContactView socials={socialsResult.data} user={userResult.data} />;
};

export default ContactPage;
