import type { Project } from "../../types/project";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import { useState } from "react";

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

  function getMonthYearString(date: Date): string {
    const namesOfMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${namesOfMonths[date.getMonth()] || ""} ${date.getFullYear()}`;
  }

  const screenshots =
    project.id !== undefined
      ? api.projects.getScreenshots.useQuery({ id: project.id }).data
      : undefined;

  return (
    <div
      className="flex flex-col items-center bg-slate-800 rounded-xl gap-2 gap-y-4 m-2 p-4 md:w-full"
      style={{ flex: "1 0 48%" }}
      onClick={() => redirect(project.id?.toString())}
    >
      {/* Picture */}
      {screenshots !== undefined && screenshots[0]?.url !== undefined ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screenshots[0]?.url}
          alt={project.name}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      ) : null}

      {/* Name */}
      <h1 className="text-2xl font-bold">{project.name}</h1>

      {/* description */}
      <p className="text-xl">{project.description}</p>

      {/* last edited */}
      {project.lastEdited !== undefined && project.lastEdited !== null ? (
        <SingleLineDisplay title="Last edited">
          {getMonthYearString(project.lastEdited)}
        </SingleLineDisplay>
      ) : null}

      {/* Demo URL */}
      {project.demoUrl !== undefined && project.demoUrl !== null ? (
        <>
          <SingleLineDisplay title="Demo site" link={project.demoUrl}>
            {project.demoUrl}
          </SingleLineDisplay>
        </>
      ) : null}

      {/* GitHub URL */}
      {project.githubUrl !== undefined && project.githubUrl !== null ? (
        <SingleLineDisplay title="Github" link={project.githubUrl}>
          {project.githubUrl}
        </SingleLineDisplay>
      ) : null}

      {/* Technologies */}
      {project.tech !== undefined && project.tech !== null ? (
        <MultiLineDisplay title="Technologies used with this project">
          {project.tech}
        </MultiLineDisplay>
      ) : null}

      {/* My Role */}
      {project.myRole !== undefined && project.myRole !== null ? (
        <MultiLineDisplay title="My role in the project">
          {project.myRole}
        </MultiLineDisplay>
      ) : null}

      {/* Outcome */}
      {project.outcome !== undefined && project.outcome !== null ? (
        <MultiLineDisplay title="Project outcome">
          {project.outcome}
        </MultiLineDisplay>
      ) : null}

      {/* Feedback */}
      {project.feedback !== undefined && project.feedback !== null ? (
        <MultiLineDisplay title="Feedback received">
          {project.feedback}
        </MultiLineDisplay>
      ) : null}

      {/* If recreate */}
      {project.ifRecreate !== undefined && project.ifRecreate !== null ? (
        <MultiLineDisplay title="If I were to recreate this project">
          {project.ifRecreate}
        </MultiLineDisplay>
      ) : null}

      {/* Screenshots */}
      {screenshots !== undefined && screenshots.length > 1 ? (
        <ImageDisplay images={screenshots} />
      ) : null}
    </div>
  );
};

export default ProjectViewer;

const SingleLineDisplay = (props: {
  title: string;
  children: React.ReactNode;
  link?: string;
}) => {
  const { title, children, link } = props;
  return (
    <div className="grid grid-cols-2 justify-items-center w-full">
      <p>{title}:</p>
      <>
        {link !== undefined ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            {children}
          </a>
        ) : (
          <p>{children}</p>
        )}
      </>
    </div>
  );
};

const MultiLineDisplay = (props: {
  title: string;
  children: React.ReactNode;
}) => {
  const { title, children } = props;
  const [showContent, setShowContent] = useState(false);
  return (
    <div>
      <p
        className="w-full cursor-pointer text-center underline"
        onClick={(e) => {
          e.stopPropagation();
          setShowContent(!showContent);
        }}
      >
        {showContent ? "⯆" : "⯈"} {title}:
      </p>
      {showContent ? <p className="text-center">{children}</p> : null}
    </div>
  );
};

// TODO: make this a carousel
// set to show pictures allows user to click through them
const ImageDisplay = (props: { images: { url: string }[] }) => {
  const { images } = props;
  const [showContent, setShowContent] = useState(false);
  return (
    <div>
      <p
        className="w-full cursor-pointer text-center underline"
        onClick={(e) => {
          e.stopPropagation();
          setShowContent(!showContent);
        }}
      >
        {showContent ? "⯆" : "⯈"} Screenshots:
      </p>
      {showContent ? (
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          {images.map((image, index) => (
            <a href={image.url} target="_blank" rel="noreferrer" key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.url}
                className="w-64 h-64 object-cover shadow-lg hover:w-72 hover:h-auto"
              />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};
