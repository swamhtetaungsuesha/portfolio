import ProjectQueryService from "@/services/project/QueryService";
import ProjectView from "@/views/admin/project/ProjectView";

const ProjectPage = async () => {
  const result = await ProjectQueryService.getList();

  return <ProjectView projects={result} />;
};

export default ProjectPage;
