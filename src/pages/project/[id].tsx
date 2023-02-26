import type { Project as PrismaProject } from "@prisma/client";
import { useRouter } from "next/router";
import ProjectEditor from "../../components/forms/project";
import type { Project } from "../../types/project";
import { api } from "../../utils/api";

const ProjectView = () => {
  const router = useRouter();
  const { id } = router.query;

  // parse id to number
  const idNum = Number(id);
  const project = api.projects.getOne.useQuery({ id: idNum }).data;
  const addProject = api.projects.update.useMutation();

  function save(project: Project) {
    try {
      if (project.id === undefined) {
        return false;
      }
      addProject.mutate({
        id: project.id,
        name: project.name,
        description: project.description,
        demoUrl: project.demoUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        tech: project.tech || undefined,
        myRole: project.myRole || undefined,
        outcome: project.outcome || undefined,
        feedback: project.feedback || undefined,
        ifRecreate: project.ifRecreate || undefined,
      });
      return true;
    } catch (e) {
      console.error("Error saving project");
      console.error(e);
      return false;
    }
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