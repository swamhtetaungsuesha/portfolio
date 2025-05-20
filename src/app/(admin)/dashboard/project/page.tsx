import ProjectQueryService from "@/services/project/QueryService";
import ProjectView from "@/views/admin/project/ProjectView";

const ProjectPage = async () => {
  const result = await ProjectQueryService.getList();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <ProjectView projects={result.data} />;
};

export default ProjectPage;
