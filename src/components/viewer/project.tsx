import type { Project } from "../../types/project";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type propsType = {
  project: Project;
};

const ProjectViewer = (props: propsType) => {
  const { project } = props;
  const router = useRouter();
  const { data: session } = useSession();

  function redirect(id: string | undefined) {
    if (id !== undefined && session?.user.admin === true) {
      router.push(`/project/${id}`).catch((e) => {
        console.error(e);
      });
    }
  }
  return (
    <div onClick={() => redirect(project.id?.toString())}>
      <h1>Project Editor</h1>
      <p>{project.name}</p>
    </div>
  );
};

export default ProjectViewer;
