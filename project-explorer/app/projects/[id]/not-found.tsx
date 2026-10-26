import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <>
      <h2>Project not found</h2>
      <p>There is no project with that ID.</p>
      <Link href="/projects">Back to projects</Link>
    </>
  );
}
