import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Company from "./_pages/company";
import Experience from "./_pages/experience";
import Project from "./_pages/project";
import Skill from "./_pages/skill";
import Tag from "./_pages/tag";
import User from "./_pages/user";
import Social from "./_pages/social";
import CompanyService from "@/services/company/CompanyService";

const routes = [
  {
    name: "Company",
    path: "company",
    page: <Company />,
  },
  {
    name: "Experience",
    path: "experience",
    page: <Experience />,
  },
  {
    name: "Project",
    path: "project",
    page: <Project />,
  },
  {
    name: "Skill",
    path: "skill",
    page: <Skill />,
  },
  {
    name: "Social",
    path: "social",
    page: <Social />,
  },
  {
    name: "Tag",
    path: "tag",
    page: <Tag />,
  },
  {
    name: "User",
    path: "user",
    page: <User />,
  },
];
const Dashboard = async () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="company" className="w-full">
        <div className="w-full border-b border-b-border/30">
          <div className="container mx-auto">
            <div className="py-5">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p>Manage your portfolio content</p>
            </div>
            <div>
              <TabsList className="grid w-full grid-cols-7 bg-transparent h-14 p-0">
                {routes.map((item, i) => (
                  <TabsTrigger
                    value={item.path}
                    key={item.path + "-" + { i }}
                    className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 h-14 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-accent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
                {/* <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="project">Project</TabsTrigger>
                <TabsTrigger value="skill">Skill</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="tag">Tag</TabsTrigger>
                <TabsTrigger value="user">User</TabsTrigger> */}
              </TabsList>
            </div>
          </div>
        </div>
        <div className="container mx-auto my-10">
          {routes.map((item, i) => (
            <TabsContent value={item.path} key={item.path + "-" + { i }}>
              {item.page}
            </TabsContent>
          ))}
        </div>
        {/* <TabsContent value="project">Projects</TabsContent> */}
      </Tabs>
    </div>
  );
};

export default Dashboard;
