import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SkillWithTag } from "@/db/schema";
import SkillForm from "./SkillForm";
import SkillCard from "./SkillCard";

const SkillView = (props: { skills: SkillWithTag[] }) => {
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
            <SkillForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {props.skills.map((skill) => (
          <SkillCard skill={skill} key={skill.id} />
        ))}
      </div>
    </div>
  );
};

export default SkillView;
