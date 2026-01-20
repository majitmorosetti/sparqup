// app/majit/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV - Majit Morosetti | Développeur Full-Stack',
  description: 'Développeur full-stack spécialisé en automatisation web pour TPE/PME',
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-forest-900">
      {children}
    </div>
  );
}