import { type NextPage } from "next";
import ProjectEditor from "../components/forms/project";
import { api } from "../utils/api";
import type { Project } from '../types/project';

const Projects: NextPage = () => {
    const addProject = api.projects.add.useMutation();

    function save(project: Project) {
        try {
            addProject.mutate(project);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

    const newProject: Project = {
        name: '',
        description: '',
    };

    return (
        <>
            <ProjectEditor save={save} project={newProject} />
        </>
    );
};

export default Projects;