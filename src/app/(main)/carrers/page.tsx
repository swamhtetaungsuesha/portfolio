import ExperienceQueryService from "@/services/experience/QueryService";
import CareersView from "@/views/careers/CareersView";
const CarrersPage = async () => {
  const result = await ExperienceQueryService.getList();
  if (!result.success) {
    return <div>505 Server Error</div>;
  }
  return <CareersView experiences={result.data} />;
};

export default CarrersPage;
