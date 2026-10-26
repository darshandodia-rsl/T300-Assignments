import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";

export default async function ProjectLayout({
  children,
  params,
}: LayoutProps<"/projects/[id]">) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  const base = `/projects/${id}`;

  return (
    <>
      <h1>{project.name}</h1>
      <p className="muted">{project.description}</p>
      <nav className="tabs">
        <Link href={base}>Overview</Link>
        <Link href={`${base}/team`}>Team</Link>
        <Link href={`${base}/tasks`}>Tasks</Link>
        <Link href={`${base}/activity`}>Activity</Link>
        <Link href={`${base}/docs`}>Docs</Link>
      </nav>
      {children}
    </>
  );
}
