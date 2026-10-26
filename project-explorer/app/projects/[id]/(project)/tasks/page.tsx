import { getProject } from "@/lib/projects";

export default async function TasksPage({ params }: PageProps<"/projects/[id]/tasks">) {
  const { id } = await params;
  const project = await getProject(id);

  return (
    <ul>
      {project?.tasks.map((task) => (
        <li key={task.title}>
          {task.done ? "✅" : "⬜"} {task.title}
        </li>
      ))}
    </ul>
  );
}
