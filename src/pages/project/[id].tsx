import { useRouter } from "next/router";
import ProjectEditor from "../../components/forms/project";
import type { Project } from "../../types/project";
import { api } from "../../utils/api";
import LoadingSpinner from "../../components/loading";

const ProjectView = () => {
  const router = useRouter();
  const { id } = router.query;

  // parse id to number
  const idNum = Number(id);
  const { data, isError, error, isLoading } = api.projects.getOne.useQuery({
    id: idNum,
  });
  const addProject = api.projects.update.useMutation();

  if (isError) {
    console.error(error);
    return <div>Error loading project</div>;
  }
  if (isLoading) {
    return <LoadingSpinner/>;
  }

  const project = data;

  function save(project: Project) {
    if (project.id === undefined) {
      return;
    }
    addProject.mutate(
      {
        id: project.id,
        name: project.name,
        description: project.description,
        demoUrl: project.demoUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        videoUrl: project.videoUrl || undefined,
        tech: project.tech || undefined,
        myRole: project.myRole || undefined,
        outcome: project.outcome || undefined,
        feedback: project.feedback || undefined,
        ifRecreate: project.ifRecreate || undefined,
        screenshots: project.screenshots?.map((s) => s.url),
        lastEdited: project.lastEdited || undefined,
        startDate: project.startDate || undefined,
      },
      {
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  return (
    <>
      {project !== undefined && project !== null ? (
        <ProjectEditor save={save} project={project} />
      ) : (
        <div>Project not found</div>
      )}
    </>
  );
};

export default ProjectView;
