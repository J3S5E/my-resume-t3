import { type NextPage } from "next";
import ProjectViewer from "../components/viewer/project";
import { api } from "../utils/api";

const Projects: NextPage = () => {
    const projects = api.projects.getAll.useQuery();
    return (
        <>
            <div className="container flex flex-col items-center justify-center gap-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem] pb-7">
                    Projects
                </h1>
                {projects.data?.map((project) => (
                    <ProjectViewer key={project.id} project={project} />
                ))}
            </div>
        </>
    );
};

export default Projects;