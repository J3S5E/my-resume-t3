import type { Project } from "../../types/project";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

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

  if (project.id === undefined) {
    return <div>Project not found</div>;
  }
  const { data: screenshots } = api.projects.getScreenshots.useQuery({
    id: project.id,
  });

  return (
    <div
      className="m-2 flex flex-col items-center gap-2 gap-y-4 rounded-xl bg-slate-800 p-4 md:w-full"
      style={{ flex: "1 0 48%" }}
      onClick={() => redirect(project.id?.toString())}
    >
      {/* Picture */}
      {screenshots !== undefined && screenshots[0]?.url !== undefined ? (
        <Image
          src={screenshots[0]?.url}
          alt={project.name}
          width={1920}
          height={1080}
          className="h-64 w-full rounded-lg object-cover shadow-lg"
          placeholder="blur"
          blurDataURL={`/_next/image?url=${screenshots[0]?.url}&w=16&q=15`}
        />
      ) : null}

      {/* Name */}
      <h1 className="text-2xl font-bold">{project.name}</h1>

      {/* description */}
      <p className="text-xl">{project.description}</p>

      {/* Project start date */}
      {project.startDate !== undefined && project.startDate !== null ? (
        <SingleLineDisplay title="Project start date">
          {getMonthYearString(project.startDate)}
        </SingleLineDisplay>
      ) : null}

      {/* last edited */}
      {project.lastEdited !== undefined && project.lastEdited !== null ? (
        <SingleLineDisplay title="Last updated">
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
        <SingleLineDisplay title="Github link" link={project.githubUrl}>
          {project.githubUrl}
        </SingleLineDisplay>
      ) : null}

      {/* Video URL */}
      {project.videoUrl !== undefined && project.videoUrl !== null ? (
        <SingleLineDisplay title="Video link" link={project.videoUrl}>
          {project.videoUrl}
        </SingleLineDisplay>
      ) : null}

      {/* Technologies */}
      {project.tech !== undefined && project.tech !== null ? (
        <MultiLineDisplay title="Technologies used with this project">
          <ReactMarkdown>{project.tech}</ReactMarkdown>
        </MultiLineDisplay>
      ) : null}

      {/* My Role */}
      {project.myRole !== undefined && project.myRole !== null ? (
        <MultiLineDisplay title="My role in the project">
          <ReactMarkdown>{project.myRole}</ReactMarkdown>
        </MultiLineDisplay>
      ) : null}

      {/* Outcome */}
      {project.outcome !== undefined && project.outcome !== null ? (
        <MultiLineDisplay title="Project outcome">
          <ReactMarkdown>{project.outcome}</ReactMarkdown>
        </MultiLineDisplay>
      ) : null}

      {/* Feedback */}
      {project.feedback !== undefined && project.feedback !== null ? (
        <MultiLineDisplay title="Feedback received">
          <ReactMarkdown>{project.feedback}</ReactMarkdown>
        </MultiLineDisplay>
      ) : null}

      {/* If recreate */}
      {project.ifRecreate !== undefined && project.ifRecreate !== null ? (
        <MultiLineDisplay title="If I were to recreate this project">
          <ReactMarkdown>{project.ifRecreate}</ReactMarkdown>
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
    <div className="grid w-full grid-cols-2 justify-items-center">
      <p>{title}:</p>
      <>
        {link !== undefined ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline break-all"
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
              <Image
                src={image.url}
                alt={image.url}
                width={640}
                height={480}
                className="h-96 w-96 scale-50 object-cover shadow-lg hover:scale-150 hover:h-auto"
                placeholder="blur"
                blurDataURL={`/_next/image?url=${image.url}&w=16&q=15`}
              />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};
