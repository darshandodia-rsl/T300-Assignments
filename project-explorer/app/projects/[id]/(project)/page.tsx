import Link from "next/link";
import { getProject } from "@/lib/projects";

export default async function OverviewPage({
  params,
  searchParams,
}: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const filters = await searchParams;
  const project = await getProject(id);

  // Carry the list filters back so the user returns to the same results
  const query = new URLSearchParams();
  for (const key of ["search", "status"]) {
    const value = filters[key];
    if (typeof value === "string") query.set(key, value);
  }
  const queryString = query.toString();

  return (
    <>
      <p>
        Status: <span className="badge">{project?.status}</span>
      </p>
      <p>Tags: {project?.tags.join(", ")}</p>
      <Link href={`/projects${queryString ? `?${queryString}` : ""}`}>
        ← Back to projects
      </Link>
    </>
  );
}
