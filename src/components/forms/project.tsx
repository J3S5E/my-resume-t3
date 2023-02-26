import type { Project } from "../../types/project";

type propsType = {
  save: (project: Project) => boolean;
  project: Project;
};

const ProjectEditor = (props: propsType) => {
  const { project } = props;
  return (
    <div>
      <h1>Project Editor</h1>
      <p>{project.name}</p>
    </div>
  );
};

export default ProjectEditor;
