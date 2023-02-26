import type { Project } from '../../types/project';

type propsType = {
    project: Project;
}

const ProjectViewer = (props: propsType) => {
    const { project } = props;
    return (
        <div>
            <h1>Project Editor</h1>
            <p>{project.name}</p>
        </div>
    );
};

export default ProjectViewer;
