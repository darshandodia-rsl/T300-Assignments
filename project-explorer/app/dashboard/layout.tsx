import Link from "next/link";
import { getProjectLinks } from "@/lib/projects";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const projects = getProjectLinks();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/analytics">Analytics</Link>
        <Link href="/dashboard/reports">Reports</Link>
        <Link href="/dashboard/team">Team</Link>
        <strong className="muted">Projects</strong>
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            {project.name}
          </Link>
        ))}
      </aside>
      <section className="dashboard-content">{children}</section>
    </div>
  );
}
