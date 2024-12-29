import Pagination from "../../components/Pagination";
import ProjectCard from "../../components/ProjectCard";

export const projects = [
  {
    id: 1,
    name: "Personal Portfolio Website",
    description:
      "A modern portfolio website showcasing skills, projects, and experiences.",
    linkId: {
      url: "http://localhost:3000/projects",
    }, // Assume this corresponds to an existing `links` table entry
    isActive: true,
    startedAt: "2023-01-15",
    endedAt: null, // Ongoing project
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-06-01T12:00:00Z",
    tags: ["React", "Next.js", "TailwindCSS", "Frontend"],
  },
  {
    id: 2,
    name: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform for a standing desk retailer.",
    linkId: {
      url: "http://localhost:3000/projects",
    },
    isActive: false,
    startedAt: "2022-03-10",
    endedAt: "2022-12-20",
    createdAt: "2022-03-10T14:00:00Z",
    updatedAt: "2022-12-20T18:30:00Z",
    tags: ["Node.js", "Express", "MongoDB", "E-Commerce"],
  },
  {
    id: 3,
    name: "Task Management App",
    description:
      "A task tracking and team collaboration tool for improving productivity.",
    linkId: {
      url: "http://localhost:3000/projects",
    },
    isActive: true,
    startedAt: "2023-05-01",
    endedAt: null, // Ongoing project
    createdAt: "2023-05-01T09:00:00Z",
    updatedAt: "2023-11-25T15:00:00Z",
    tags: ["React Native", "Firebase", "Productivity", "Mobile App"],
  },
  {
    id: 4,
    name: "Weather Forecast Dashboard",
    description:
      "A real-time weather dashboard with analytics for different regions.",
    linkId: {
      url: "http://localhost:3000/projects",
    },
    isActive: false,
    startedAt: "2021-09-01",
    endedAt: "2022-02-15",
    createdAt: "2021-09-01T08:30:00Z",
    updatedAt: "2022-02-15T17:45:00Z",
    tags: ["Python", "Django", "API Integration", "Data Visualization"],
  },
];

const Project = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div>
        {projects.map((item, index) => (
          <ProjectCard key={item.id} data={item} index={index + 1} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Project;
