"use server";
import CompanyQueryService from "@/services/company/QueryService";
import CompanyView from "@/views/admin/company/CompanyView";
const CompanyPage = async () => {
  const result = await CompanyQueryService.getList();

  return <CompanyView companies={result} />;
};

export default CompanyPage;
