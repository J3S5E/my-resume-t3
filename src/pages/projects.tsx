import { type NextPage } from "next";
import ProjectViewer from "../components/viewer/project";
import { api } from "../utils/api";

const Projects: NextPage = () => {
  const projects = api.projects.getAll.useQuery();

  return (
    <div
      className="container flex
        flex-col items-center
        justify-center gap-12"
    >
      <h1
        className="text-5xl font-extrabold
          tracking-tight text-white
          sm:text-[5rem]"
      >
        Projects
      </h1>
      <div
        className="flex flex-col
          md:flex-row flex-wrap
          items-center justify-center
          gap-6 w-full"
      >
        {projects.data?.map((project) => (
          <ProjectViewer key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;