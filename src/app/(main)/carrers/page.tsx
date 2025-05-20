import ExperienceQueryService from "@/services/experience/QueryService";
import CareersView from "@/views/careers/CareersView";
const CarrersPage = async () => {
  const result = await ExperienceQueryService.getList();
  return <CareersView experiences={result} />;
};

export default CarrersPage;
