import { cache } from "react";
import projectsData from "@/data/projects.json";

export type ProjectStatus = "active" | "completed" | "planned";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  team: { name: string; role: string }[];
  tasks: { title: string; done: boolean }[];
  activity: string[];
};

const projects = projectsData as Project[];

export const STATUSES: ProjectStatus[] = ["active", "completed", "planned"];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProjects(filters: {
  search?: string;
  status?: string;
}): Promise<Project[]> {
  const search = filters.search?.toLowerCase().trim();

  return projects.filter((project) => {
    const matchesStatus = !filters.status || project.status === filters.status;
    const matchesSearch =
      !search ||
      project.name.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.tags.some((tag) => tag.includes(search));
    return matchesStatus && matchesSearch;
  });
}

// Simulates a slow API. cache() avoids fetching twice in the same request
// (the layout and the page both ask for the same project).
export const getProject = cache(async (id: string): Promise<Project | undefined> => {
  await sleep(1500);

  // Intentional failure for testing: project 5 ("Mobile App Planning") always
  // throws so the error UI (error.tsx) and its retry button can be demonstrated.
  if (id === "5") {
    throw new Error("Failed to load project data");
  }

  return projects.find((project) => project.id === id);
});

export async function getRecentActivity(): Promise<string[]> {
  await sleep(3000);
  return projects.flatMap((project) =>
    project.activity.slice(0, 1).map((item) => `${project.name}: ${item}`),
  );
}

export function getProjectCount() {
  return {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
  };
}

export function getProjectLinks() {
  return projects.map(({ id, name }) => ({ id, name }));
}

export function getTaskProgress() {
  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    done: project.tasks.filter((task) => task.done).length,
    total: project.tasks.length,
  }));
}

export function getAllTeamMembers() {
  return projects.flatMap((project) =>
    project.team.map((member) => ({ ...member, project: project.name })),
  );
}

export function getCompletedProjects() {
  return projects.filter((project) => project.status === "completed");
}
