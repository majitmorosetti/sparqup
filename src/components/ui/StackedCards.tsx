// src/components/ui/StackedCards.tsx
import { cn } from '@/lib/utils';

interface StackedCardsProps {
  className?: string;
}

export default function StackedCards({ className }: StackedCardsProps) {
  return (
    <div className={cn("relative w-full h-full min-h-[400px] flex items-center justify-center", className)}>
      {/* Card 3 (arrière) */}
      <div 
        className="absolute w-[85%] h-[280px] bg-white rounded-2xl border border-neutral-200 shadow-lg"
        style={{
          transform: 'translateY(20px) scale(0.95)',
          zIndex: 1
        }}
      />

      {/* Card 2 (milieu) */}
      <div 
        className="absolute w-[90%] h-[280px] bg-white rounded-2xl border border-neutral-200 shadow-xl"
        style={{
          transform: 'translateY(10px) scale(0.975)',
          zIndex: 2
        }}
      />

      {/* Card 1 (devant) */}
      <div 
        className="absolute w-[95%] h-[280px] bg-white rounded-2xl border border-neutral-200 shadow-2xl"
        style={{
          transform: 'translateY(0px) scale(1)',
          zIndex: 3
        }}
      >
        {/* Contenu de la carte principale */}
        <div className="p-6 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-100 border border-forest-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-forest-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-950">Projet complet</h4>
                <p className="text-sm text-neutral-500">En production</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
              Actif
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Pages</p>
              <p className="text-2xl font-bold text-neutral-950">12</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Utilisateurs</p>
              <p className="text-2xl font-bold text-neutral-950">2.4k</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Uptime</p>
              <p className="text-2xl font-bold text-forest-700">99.9%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}