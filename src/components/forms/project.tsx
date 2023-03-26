import { useEffect, useReducer, useState } from "react";
import type { Project } from "../../types/project";
import type { Screenshot } from "@prisma/client";
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
      setScreenshots(fetchedScreenshots.map((screenshot: Screenshot) => screenshot.url));
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
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem] pb-7">
        Project Editor
      </h1>
      <div className="flex flex-col gap-5 m-5">
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
        <ProjectLastEdited
          lastEdited={project.lastEdited}
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
        className="p-2 m-5 bg-blue-500 rounded-md hover:bg-blue-600"
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
    case "setLastEdited":
      return { ...state, lastEdited: new Date(action.payload || "") };
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

const ProjectLastEdited = ({
  lastEdited,
  dispatch,
}: {
  lastEdited: Date | undefined | null;
  dispatch: (action: { type: string; payload: string }) => void;
}) => {
  return (
    <div className="flex justify-between gap-5">
      <label htmlFor="description">Last edited:</label>
      <input
        type="date"
        id="lastEdited"
        className="text-black"
        value={getDateString(lastEdited || new Date())}
        onChange={(e) =>
          dispatch({ type: "setLastEdited", payload: e.target.value })
        }
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
            className="px-2 bg-gray-500 rounded-md hover:bg-gray-600"
            onClick={() => dispatch({ type: "removeScreenshot", index: index })}
          >
            ➖
          </button>
        </div>
      ))}
      <button
        className="p-1 m-2 bg-gray-500 rounded-md hover:bg-gray-600"
        onClick={() => dispatch({ type: "addScreenshot" })}
      >
        Add Screenshot
      </button>
    </div>
  );
};
