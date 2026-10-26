import { getRecentActivity } from "@/lib/projects";

// Async Server Component with a slow fetch; wrapped in <Suspense> on the dashboard.
export default async function RecentActivity() {
  const items = await getRecentActivity();

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
