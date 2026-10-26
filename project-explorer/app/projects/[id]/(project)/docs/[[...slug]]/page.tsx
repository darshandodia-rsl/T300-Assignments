import Link from "next/link";

export default async function DocsPage({
  params,
}: PageProps<"/projects/[id]/docs/[[...slug]]">) {
  const { id, slug } = await params;
  const segments = slug ?? [];
  const docsPath = `/projects/${id}/docs`;

  return (
    <>
      <h2>Documentation</h2>
      <p>
        Requested path: <code>{[docsPath, ...segments].join("/")}</code>
      </p>

      {segments.length === 0 ? (
        <ul>
          <li>
            <Link href={`${docsPath}/setup`}>Setup</Link>
          </li>
          <li>
            <Link href={`${docsPath}/setup/database`}>Setup → Database</Link>
          </li>
        </ul>
      ) : (
        <>
          <p className="muted">Breadcrumb: {segments.join(" › ")}</p>
          <p>
            This page documents <strong>{segments[segments.length - 1]}</strong>.
          </p>
          <Link href={docsPath}>← All docs</Link>
        </>
      )}
    </>
  );
}
