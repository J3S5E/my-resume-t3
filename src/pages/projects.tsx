import type { GetStaticProps, NextPage } from "next";
import ProjectViewer from "../components/viewer/project";
import { api } from "../utils/api";
import LoadingSpinner from "../components/loading";
import { generateSSGHelper } from "../server/helpers/ssgHelper";

const Projects: NextPage = () => {
  const { data, isError, error, isLoading } = api.projects.getAll.useQuery();

  if (isError) {
    console.error(error);
    return <div>Error loading projects</div>;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const sortedProjects =
    data?.slice(0).sort((a, b) => {
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
        className="flex w-full
          flex-col flex-wrap
          items-center justify-center
          gap-6 md:flex-row"
      >
        {sortedProjects.map((project) => (
          <ProjectViewer key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = generateSSGHelper();

  await ssg.projects.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 3600,
  };
};

export default Projects;
