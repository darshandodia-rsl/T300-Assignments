"use client";

export default function ProjectError({ retry }: { error: Error; retry: () => void }) {
  return (
    <div className="card">
      <h2>Something went wrong</h2>
      <p>We couldn&apos;t load this project. Please try again.</p>
      <button className="retry" onClick={() => retry()}>
        Try again
      </button>
    </div>
  );
}
