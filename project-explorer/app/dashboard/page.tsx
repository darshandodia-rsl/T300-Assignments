import { Suspense } from "react";
import RecentActivity from "@/components/RecentActivity";
import Skeleton from "@/components/Skeleton";
import { getProjectCount } from "@/lib/projects";

// Render on every request so the slow section really streams in (not prerendered at build)
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const counts = getProjectCount();

  return (
    <>
      <h1>Dashboard</h1>

      {/* Rendered immediately, not blocked by the slow section below */}
      <div className="stats">
        <div className="card">
          <strong>{counts.total}</strong>
          <div className="muted">Total projects</div>
        </div>
        <div className="card">
          <strong>{counts.active}</strong>
          <div className="muted">Active</div>
        </div>
        <div className="card">
          <strong>{counts.completed}</strong>
          <div className="muted">Completed</div>
        </div>
      </div>

      <h2>Recent Activity</h2>
      <Suspense fallback={<Skeleton lines={4} />}>
        <RecentActivity />
      </Suspense>
    </>
  );
}
