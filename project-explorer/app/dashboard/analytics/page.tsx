import { getTaskProgress } from "@/lib/projects";

export default function AnalyticsPage() {
  const progress = getTaskProgress();

  return (
    <>
      <h1>Analytics</h1>
      <p className="muted">Task completion per project.</p>
      {progress.map((item) => (
        <div key={item.id} className="card">
          <strong>{item.name}</strong>
          <div>
            {item.done} of {item.total} tasks done (
            {Math.round((item.done / item.total) * 100)}%)
          </div>
        </div>
      ))}
    </>
  );
}
