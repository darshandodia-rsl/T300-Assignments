import { getProject } from "@/lib/projects";

export default async function ActivityPage({
  params,
}: PageProps<"/projects/[id]/activity">) {
  const { id } = await params;
  const project = await getProject(id);

  return (
    <ul>
      {project?.activity.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
