import Link from "next/link";
import { getCompletedProjects } from "@/lib/projects";

export default function ReportsPage() {
  const completed = getCompletedProjects();

  return (
    <>
      <h1>Reports</h1>
      <p className="muted">Completed project reports.</p>
      {completed.map((project) => (
        <div key={project.id} className="card">
          <Link href={`/projects/${project.id}`}>{project.name}</Link>
          <p className="muted">{project.description}</p>
          <div>
            {project.tasks.length} tasks delivered by {project.team.length} team
            members
          </div>
        </div>
      ))}
    </>
  );
}
