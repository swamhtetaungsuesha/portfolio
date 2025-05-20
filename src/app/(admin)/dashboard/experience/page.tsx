import CompanyQueryService from "@/services/company/QueryService";
import ExperienceQueryService from "@/services/experience/QueryService";
import ExperienceView from "@/views/admin/experience/ExperienceView";

const ExperiencePage = async () => {
  const companiesResult = await CompanyQueryService.getList();

  const experiencesResult = await ExperienceQueryService.getList();
  if (!experiencesResult.success || !companiesResult.success) {
    return <div>505 Server Error</div>;
  }
  return (
    <ExperienceView
      companies={companiesResult.data}
      experiences={experiencesResult.data}
    />
  );
};

export default ExperiencePage;
