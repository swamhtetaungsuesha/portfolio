import ExperienceCard from "@/components/card/experience";
import ExperienceForm from "@/components/form/experience";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CompanyQueryService from "@/services/company/QueryService";
import ExperienceQueryService from "@/services/experience/QueryService";

const Experience = async () => {
  const companiesResult = await CompanyQueryService.getList();

  const experiencesResult = await ExperienceQueryService.getList();
  if (!experiencesResult.success || !companiesResult.success) {
    return <div>505 Server Error</div>;
  }
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
            <ExperienceForm companies={companiesResult.data} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {experiencesResult.data.map((experience) => (
          <ExperienceCard
            experience={experience}
            companies={companiesResult.data}
            key={experience.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
