import { type NextPage } from "next";
import ProjectViewer from "../components/viewer/project";
import { api } from "../utils/api";
import LoadingSpinner from "../components/loading";

const Projects: NextPage = () => {
  const { data, isError, error, isLoading } = api.projects.getAll.useQuery();

  if (isError) {
    console.error(error);
    return <div>Error loading projects</div>;
  }
  if (isLoading) {
    return <LoadingSpinner/>;
  }

  const sortedProjects = data?.slice(0).sort((a, b) => {
    if (a.lastEdited === undefined) return 1;
    if (b.lastEdited === undefined) return -1;
    return b.lastEdited.getTime() - a.lastEdited.getTime();
  }) ?? [];

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
        {sortedProjects.map((project) => (
          <ProjectViewer key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;