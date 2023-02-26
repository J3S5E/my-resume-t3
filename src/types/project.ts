import type { ScreenShot } from "./screenshot";

export type Project = {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    description: string;
    lastEdited?: Date | null;
    demoUrl?: string | null;
    screenshots?: ScreenShot[];
    tech?: string | null;
    myRole?: string | null;
    outcome?: string | null;
    feedback?: string | null;
    ifRecreate?: string | null;
    githubUrl?: string | null;
};