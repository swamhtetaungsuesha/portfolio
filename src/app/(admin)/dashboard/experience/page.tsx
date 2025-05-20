import CompanyQueryService from "@/services/company/QueryService";
import ExperienceQueryService from "@/services/experience/QueryService";
import ExperienceView from "@/views/admin/experience/ExperienceView";

const ExperiencePage = async () => {
  const companiesResult = await CompanyQueryService.getList();

  const experiencesResult = await ExperienceQueryService.getList();

  return (
    <ExperienceView
      companies={companiesResult}
      experiences={experiencesResult}
    />
  );
};

export default ExperiencePage;
