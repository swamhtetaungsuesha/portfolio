import Bulb from "@/components/Bulb";
import Circles from "@/components/Circles";
import TopLeftImg from "@/components/TopLeftImg";
import { SocialSelect, UserSelect } from "@/db/schema";

const ContactView = async (props: {
  socials: SocialSelect[];
  user: UserSelect;
}) => {
  return (
    <div className="flex flex-col py-10 w-full h-full items-center relative">
      <TopLeftImg />
      <Circles />
      <Bulb />
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="md:text-9xl text-6xl text-white font-semibold italic">
          Let’s Talk
        </h1>
        <h1 className="md:text-9xl text-6xl text-accent font-semibold italic tracking-widest uppercase">
          Ideas
        </h1>
      </div>
      <div className="text-left text-sm md:text-base flex flex-col md:flex-row  w-full md:w-[75vw] lg:w-[50vw] justify-between items-start flex-none px-12 py-12 gap-6 md:gap-12">
        <div className="">
          <p className="font-semibold text-white">CONTACT</p>
          <div className="md:mt-4 flex flex-col">
            <p>
              <a href={"tel:" + props.user.phoneNo}>{props.user.phoneNo}</a>
            </p>
            <p>
              <a href={"mailto:" + props.user.email}>{props.user.email}</a>
            </p>
          </div>
        </div>
        <div className="">
          <p className="font-semibold text-white">MY SPACE</p>
          <div className="md:mt-4 flex flex-col">
            {props.socials.map((social) => (
              <p key={social.id}>
                <a href={social.link} target="_blank">
                  {social.name}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
