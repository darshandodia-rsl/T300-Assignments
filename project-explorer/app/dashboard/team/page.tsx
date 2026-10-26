import { getAllTeamMembers } from "@/lib/projects";

export default function DashboardTeamPage() {
  const members = getAllTeamMembers();

  return (
    <>
      <h1>Team</h1>
      <p className="muted">Everyone working across projects.</p>
      <ul>
        {members.map((member) => (
          <li key={`${member.project}-${member.name}`}>
            {member.name} <span className="muted">– {member.role}, {member.project}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
