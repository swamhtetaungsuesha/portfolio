"use server";
import CompanyQueryService from "@/services/company/QueryService";
import CompanyView from "@/views/admin/company/CompanyView";
const CompanyPage = async () => {
  const result = await CompanyQueryService.getList();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <CompanyView companies={result.data} />;
};

export default CompanyPage;
