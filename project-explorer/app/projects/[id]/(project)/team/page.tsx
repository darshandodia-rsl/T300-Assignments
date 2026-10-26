import { getProject } from "@/lib/projects";

export default async function TeamPage({ params }: PageProps<"/projects/[id]/team">) {
  const { id } = await params;
  const project = await getProject(id);

  return (
    <ul>
      {project?.team.map((member) => (
        <li key={member.name}>
          {member.name} <span className="muted">– {member.role}</span>
        </li>
      ))}
    </ul>
  );
}
