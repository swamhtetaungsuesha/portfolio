import ProjectQueryService from "@/services/project/QueryService";
import ProjectsView from "@/views/projects/ProjectsView";

const ProjectPage = async () => {
  const result = await ProjectQueryService.getList();

  return <ProjectsView projects={result} />;
};

export default ProjectPage;
