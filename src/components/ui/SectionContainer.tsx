// src/components/ui/SectionContainer.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  gridBgColor?: string; // Couleur des lignes du grid
  cellBgColor?: string; // Couleur du contenu central
  showTopGradient?: boolean;
  showBottomGradient?: boolean;
  gradientFromColor?: string; // ex: "from-white"
  gradientHeight?: string; // ex: "h-32"
  gradients: {
    topLeft: string;
    topCenter: string;
    topRight: string;
    middleLeft: string;
    middleRight: string;
    bottomLeft: string;
    bottomCenter: string;
    bottomRight: string;
  };
}

export default function SectionContainer({ 
  children, 
  className,
  gridBgColor,
  cellBgColor,
  showTopGradient = false,
  showBottomGradient = false,
  gradientFromColor = 'from-white',
  gradientHeight = 'h-32',
  gradients
}: SectionContainerProps) {

  return (
    <section className={cn("relative", className)}>
      {/* Barre gradient top */}
      {showTopGradient && (
        <div className={cn(
          "absolute top-0 left-0 right-0 bg-gradient-to-b to-transparent z-50 pointer-events-none",
          gradientHeight,
          gradientFromColor
        )} />
      )}

      {/* Barre gradient bottom */}
      {showBottomGradient && (
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t to-transparent z-50 pointer-events-none",
          gradientHeight,
          gradientFromColor
        )} />
      )}

      {/* Grid */}
      <div className={cn(
        "grid grid-cols-[1fr_minmax(0,1080px)_1fr] grid-rows-[auto_1fr_auto]",
        "gap-px",
        gridBgColor
      )}>
        {/* ROW 1 */}
        <div className={cn("min-h-[5rem] lg:min-h-[8rem]", gradients.topLeft)} />
        <div className={cn("min-h-[5rem] lg:min-h-[8rem]", gradients.topCenter)} />
        <div className={cn("min-h-[5rem] lg:min-h-[8rem]", gradients.topRight)} />

        {/* ROW 2 */}
        <div className={gradients.middleLeft} />
        <div className={cellBgColor}>
          {children}
        </div>
        <div className={gradients.middleRight} />

        {/* ROW 3 */}
        <div className={cn("min-h-[5rem] lg:min-h-[8rem]", gradients.bottomLeft)} />
        <div className={cn("min-h-[5rem] lg:min-h-[8rem]", gradients.bottomCenter)} />
        <div className={cn("min-h-[5rem] lg:min-h-[8rem]", gradients.bottomRight)} />
      </div>
    </section>
  );
}