import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to Project Explorer</h1>
      <p>
        Browse company projects, check who is on each team, follow tasks and
        keep an eye on recent activity.
      </p>
      <p>
        <Link href="/projects">Browse projects</Link> or head to the{" "}
        <Link href="/dashboard">dashboard</Link>.
      </p>
    </>
  );
}
