import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CompanySelect, ExperienceWithCompany } from "@/db/schema";
import ExperienceForm from "./ExperienceForm";
import ExperienceCard from "./ExperienceCard";

const ExperienceView = (props: {
  companies: CompanySelect[];
  experiences: ExperienceWithCompany[];
}) => {
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>Add New Experience</DialogTitle>
            </DialogHeader>
            <ExperienceForm companies={props.companies} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {props.experiences.map((experience) => (
          <ExperienceCard
            experience={experience}
            companies={props.companies}
            key={experience.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceView;
