import { type NextPage } from "next";
import ProjectEditor from "../components/forms/project";
import { api } from "../utils/api";
import type { Project } from '../types/project';

const Projects: NextPage = () => {
    
    const addProject = api.projects.add.useMutation();

    function save(project: Project) {
        try {
            addProject.mutate({
                name: project.name,
                description: project.description,
                demoUrl: project.demoUrl || undefined,
                githubUrl: project.githubUrl || undefined,
                tech: project.tech || undefined,
                myRole: project.myRole || undefined,
                outcome: project.outcome || undefined,
                feedback: project.feedback || undefined,
                ifRecreate: project.ifRecreate || undefined,
                screenshots: project.screenshots?.map((s) => (s.url)),
                lastEdited: project.lastEdited || undefined,
            }, {
                onError: (error) => {
                    console.error(error);
                }
            });
            return true;
        }
        catch (e) {
            console.error("Error saving project");
            console.error(e);
            return false;
        }
    }

    return (
        <>
            <ProjectEditor save={save} />
        </>
    );
};

export default Projects;