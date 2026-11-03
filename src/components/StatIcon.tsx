import { Users, FolderKanban, Award, UserPlus } from 'lucide-react';

const icons = { Clients: Users, Projects: FolderKanban, Awards: Award, Employees: UserPlus };

export default function StatIcon({ label }: { label: string }) {
  const Icon = icons[label as keyof typeof icons] ?? FolderKanban;
  return <Icon className="stat-icon" strokeWidth={1.6} aria-hidden="true" />;
}
