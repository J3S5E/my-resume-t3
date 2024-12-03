import type { Screenshot } from "@prisma/client";
import { useEffect, useReducer, useState } from "react";
import type { Project } from "../../types/project";
import { api } from "../../utils/api";

type propsType = {
  save: (project: Project) => void;
  project?: Project;
};

const ProjectEditor = (props: propsType) => {
  const defaultProject: Project = {
    name: "",
    description: "",
  };
  const [project, dispatch] = useReducer(
    projectReducer,
    props.project || defaultProject
  );
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const fetchedScreenshots =
    project.id !== undefined
      ? api.projects.getScreenshots.useQuery({ id: project.id }).data
      : undefined;

  useEffect(() => {
    if (project.id === undefined) return;
    if (fetchedScreenshots !== undefined)
      setScreenshots(
        fetchedScreenshots.map((screenshot: Screenshot) => screenshot.url)
      );
  }, [fetchedScreenshots, project]);

  useEffect(() => {
    if (project.id === undefined) return;
    if (screenshots === undefined) return;
    if (project.screenshots !== undefined) return;
    screenshots?.forEach((element) => {
      dispatch({ type: "addScreenshot", payload: element });
    });
  }, [project, screenshots]);

  return (
    <>
      <h1 className="pb-7 text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Project Editor
      </h1>
      <div className="m-5 flex flex-col gap-5">
        <ProjectTextField
          name="Name"
          value={project.name}
          dispatch={dispatch}
        />
        <ProjectTextField
          name="Description"
          value={project.description}
          dispatch={dispatch}
        />
        <ProjectDateField
          name="Project Start Date"
          date={project.startDate}
          dispatch={dispatch}
        />
        <ProjectDateField
          name="Last Edited"
          date={project.lastEdited}
          dispatch={dispatch}
        />
        <ProjectTextField
          name="Demo URL"
          value={project.demoUrl}
          dispatch={dispatch}
        />
        <ProjectTextField
          name="Github URL"
          value={project.githubUrl}
          dispatch={dispatch}
        />
        <ProjectTextField
          name="Video URL"
          value={project.videoUrl}
          dispatch={dispatch}
        />
        <ProjectTextArea name="Tech" value={project.tech} dispatch={dispatch} />
        <ProjectTextArea
          name="My Role"
          value={project.myRole}
          dispatch={dispatch}
        />
        <ProjectTextArea
          name="Outcome"
          value={project.outcome}
          dispatch={dispatch}
        />
        <ProjectTextArea
          name="Feedback"
          value={project.feedback}
          dispatch={dispatch}
        />
        <ProjectTextArea
          name="If Recreate"
          value={project.ifRecreate}
          dispatch={dispatch}
        />
        <ProjectScreenshots
          screenshots={getScreenshotUrls(project)}
          dispatch={dispatch}
        />
      </div>
      <button
        className="m-5 rounded-md bg-blue-500 p-2 hover:bg-blue-600"
        onClick={() => props.save(project)}
      >
        Save
      </button>
    </>
  );
};

export default ProjectEditor;

//// local functions
function getDateString(date: Date): string {
  // with leading zeros
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getScreenshotUrls(project: Project): string[] {
  return project.screenshots?.map((screenshot) => screenshot.url) || [];
}

function projectReducer(
  state: Project,
  action: { type: string; payload?: string; index?: number }
): Project {
  switch (action.type) {
    case "Name":
      return { ...state, name: action.payload || "" };
    case "Description":
      return { ...state, description: action.payload || "" };
    case "Last Edited":
      return { ...state, lastEdited: new Date(action.payload || "") };
    case "Project Start Date":
      return { ...state, startDate: new Date(action.payload || "") };
    case "Github URL":
      return { ...state, githubUrl: action.payload };
    case "Demo URL":
      return { ...state, demoUrl: action.payload };
    case "Tech":
      return { ...state, tech: action.payload };
    case "My Role":
      return { ...state, myRole: action.payload };
    case "Outcome":
      return { ...state, outcome: action.payload };
    case "Feedback":
      return { ...state, feedback: action.payload };
    case "If Recreate":
      return { ...state, ifRecreate: action.payload };

    // Screenshots
    case "addScreenshot":
      return {
        ...state,
        screenshots: [
          ...(state.screenshots || []),
          { url: action.payload || "" },
        ],
      };
    case "removeScreenshot":
      if (action.index === undefined) {
        throw Error("No index provided.");
      }
      return {
        ...state,
        screenshots: [
          ...(state.screenshots || []).slice(0, action.index),
          ...(state.screenshots || []).slice(action.index + 1),
        ],
      };
    case "setScreenshot":
      if (action.index === undefined) {
        throw Error("No index provided.");
      }
      return {
        ...state,
        screenshots: [
          ...(state.screenshots || []).slice(0, action.index),
          { url: action.payload || "" },
          ...(state.screenshots || []).slice(action.index + 1),
        ],
      };
  }

  throw Error("Unknown action.");
}

//// local components
const ProjectTextField = ({
  name,
  value,
  dispatch,
}: {
  name: string;
  value: string | undefined | null;
  dispatch: (action: { type: string; payload: string }) => void;
}) => {
  return (
    <div className="flex justify-between gap-5">
      <label htmlFor={name}>{name}:</label>
      <input
        type="text"
        id={name}
        className="text-black"
        value={value || ""}
        size={40}
        onChange={(e) => dispatch({ type: name, payload: e.target.value })}
      />
    </div>
  );
};

const ProjectTextArea = ({
  name,
  value,
  dispatch,
}: {
  name: string;
  value: string | undefined | null;
  dispatch: (action: { type: string; payload: string }) => void;
}) => {
  return (
    <div className="flex justify-between gap-5">
      <label htmlFor={name}>{name}:</label>
      <textarea
        id={name}
        className="text-black"
        value={value || ""}
        cols={40}
        onChange={(e) => dispatch({ type: name, payload: e.target.value })}
      />
    </div>
  );
};

const ProjectDateField = ({
  name,
  date,
  dispatch,
}: {
  name: string;
  date: Date | undefined | null;
  dispatch: (action: { type: string; payload: string }) => void;
}) => {
  return (
    <div className="flex justify-between gap-5">
      <label htmlFor={name}>{name}</label>
      <input
        type="date"
        id={name}
        className="text-black"
        value={getDateString(date || new Date())}
        onChange={(e) => dispatch({ type: name, payload: e.target.value })}
      />
    </div>
  );
};

const ProjectScreenshots = ({
  screenshots,
  dispatch,
}: {
  screenshots: string[] | undefined | null;
  dispatch: (action: {
    type: string;
    payload?: string;
    index?: number;
  }) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="screenshots">Screenshots:</label>
      {screenshots?.map((screenshot, index) => (
        <div key={index} className="flex justify-between">
          <input
            type="text"
            id="screenshot"
            className="text-black"
            value={screenshot}
            size={45}
            onChange={(e) =>
              dispatch({
                type: "setScreenshot",
                payload: e.target.value,
                index,
              })
            }
          />
          <button
            className="rounded-md bg-gray-500 px-2 hover:bg-gray-600"
            onClick={() => dispatch({ type: "removeScreenshot", index: index })}
          >
            ➖
          </button>
        </div>
      ))}
      <button
        className="m-2 rounded-md bg-gray-500 p-1 hover:bg-gray-600"
        onClick={() => dispatch({ type: "addScreenshot" })}
      >
        Add Screenshot
      </button>
    </div>
  );
};
