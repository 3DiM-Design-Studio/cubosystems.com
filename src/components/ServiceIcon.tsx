import { Boxes, ListChecks, BarChart3, Sparkles, Code2, Search } from 'lucide-react';

const icons = [Boxes, ListChecks, BarChart3, Sparkles, Code2, Search];

export default function ServiceIcon({ index }: { index: number }) {
  const Icon = icons[index % icons.length];
  return <Icon className="service-icon" strokeWidth={1.6} aria-hidden="true" />;
}
