import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { getProjects, STATUSES } from "@/lib/projects";

function buildQuery(search?: string, status?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export default async function ProjectsPage({ searchParams }: PageProps<"/projects">) {
  const filters = await searchParams;
  const search = typeof filters.search === "string" ? filters.search : undefined;
  const status = typeof filters.status === "string" ? filters.status : undefined;

  const projects = await getProjects({ search, status });
  const query = buildQuery(search, status);

  return (
    <>
      <h1>Projects</h1>

      {/* A plain GET form puts the search term in the URL; no client JS needed */}
      <form className="filters">
        <input
          type="search"
          name="search"
          placeholder="Search projects"
          defaultValue={search}
        />
        {status && <input type="hidden" name="status" value={status} />}
        <button type="submit">Search</button>
      </form>

      <div className="filters">
        <span>Status:</span>
        <Link href={`/projects${buildQuery(search)}`} className={!status ? "selected" : ""}>
          all
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/projects${buildQuery(search, s)}`}
            className={status === s ? "selected" : ""}
          >
            {s}
          </Link>
        ))}
      </div>

      {projects.length === 0 && <p>No projects match your filters.</p>}

      {projects.map((project) => (
        <div key={project.id} className="card">
          <div className="card-row">
            <div>
              <h2>
                <Link href={`/projects/${project.id}${query}`}>{project.name}</Link>
              </h2>
              <p className="muted">{project.description}</p>
              <span className="badge">{project.status}</span>
            </div>
            <FavoriteButton projectName={project.name} />
          </div>
        </div>
      ))}
    </>
  );
}
