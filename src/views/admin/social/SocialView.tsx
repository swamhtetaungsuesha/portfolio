import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SocialSelect } from "@/db/schema";
import SocialForm from "./SocialForm";
import SocialCard from "./SocialCard";

const SocialView = (props: { socials: SocialSelect[] }) => {
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Company Management</h1> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <SocialForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {props.socials.map((social) => (
          <SocialCard social={social} key={social.id} />
        ))}
      </div>
    </div>
  );
};

export default SocialView;
