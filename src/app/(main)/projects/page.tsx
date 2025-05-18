import ProjectService from "@/services/project/ProjectService";
import ProjectsView from "@/views/projects/ProjectsView";

const Project = async () => {
  const result = await ProjectService.getList();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }

  return <ProjectsView projects={result.data} />;
};

export default Project;
