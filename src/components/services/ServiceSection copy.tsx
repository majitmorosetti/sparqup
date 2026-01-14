// src/components/services/ServiceSection.tsx
'use client';

import { ComponentType, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionContainer from '../ui/SectionContainer';

interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
  pricing?: string;
  duration: string;
  imageUrl: string;
  SVG?: ComponentType;
  imageAlt: string;
  reversed?: boolean;
  imageBorder?: boolean;
  imageShadow?: boolean;
  imageRounded?: boolean;
  imageObjectFit?: 'cover' | 'contain';
  aspectRatio?: '4/3' | '3/4' | '16/9' | '1/1' | 'auto';
}

export default function ServiceSection({
  id,
  title,
  subtitle,
  description,
  features,
  technologies,
  duration,
  imageUrl,
  SVG,
  imageAlt,
  reversed = false,
  imageBorder = true,
  imageShadow = true,
  imageRounded = true,
  imageObjectFit = 'cover',
  aspectRatio = '4/3'
}: ServiceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split description
  const [hookText, fullText] = description.includes('|') 
    ? description.split('|')
    : [description, ''];

  // Styles configurations
  const aspectClasses = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    'auto': ''
  };

  const imageWrapperClasses = cn(
    "relative w-full",
    aspectClasses[aspectRatio],
    imageRounded && "rounded-2xl",
    imageBorder && "border-2 border-neutral-200",
    imageShadow && "shadow-xl",
    "overflow-hidden"
  );

  const imageClasses = cn(
    imageObjectFit === 'cover' ? "object-cover" : "object-contain"
  );

  const sectionGradients = {
    topLeft: 'bg-gradient-to-b from-white to-neutral-50',
    topCenter: 'bg-gradient-to-b from-white to-neutral-50',
    topRight: 'bg-gradient-to-b from-white to-neutral-50',
    middleLeft: 'bg-gradient-to-b from-neutral-50 to-neutral-100',
    middleRight: 'bg-gradient-to-b from-neutral-50 to-neutral-100',
    bottomLeft: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
    bottomCenter: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
    bottomRight: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
  };

  // === SHARED COMPONENTS ===
  
  const VisualMedia = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(
      "relative",
      isMobile ? "py-4" : "self-center"
    )}>
      {SVG ? (
        <div className={cn(
          "w-full flex items-center justify-center",
          isMobile ? "h-[240px]" : "h-[400px]"
        )}>
          <div className="flex items-center justify-center">
            <SVG />
          </div>
        </div>
      ) : (
        <div className={imageWrapperClasses}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className={imageClasses}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      
      {/* Accent décoratif (desktop only, image only) */}
      {!isMobile && !SVG && imageShadow && (
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-forest-600 rounded-2xl -z-10 opacity-10" />
      )}
    </div>
  );

  const ContentHeader = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <p className={cn(
        "font-semibold uppercase tracking-wide text-forest-600",
        isMobile ? "text-sm mb-2" : "text-sm mb-3"
      )}>
        {subtitle}
      </p>
      <h2 className={cn(
        "font-heading font-bold text-neutral-950",
        isMobile ? "text-3xl mb-4" : "text-3xl sm:text-4xl mb-6"
      )}>
        {title}
      </h2>
    </>
  );

  const DescriptionText = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(
      "text-neutral-800 leading-relaxed",
      isMobile ? "text-base mb-6" : "text-lg mb-4"
    )}>
      <p className={isMobile ? "text-neutral-800 mb-2" : "mb-3"}>
        {hookText}
      </p>
      
      {fullText && (
        <div className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          !isExpanded && "grid-rows-[0fr] opacity-0",
          isExpanded && "grid-rows-[1fr] opacity-100"
        )}>
          <div className="overflow-hidden">
            <p className="pt-2">{fullText}</p>
          </div>
        </div>
      )}
    </div>
  );

  const FeaturesList = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {features.length > 0 && (
        <div>
          <h3 className={cn(
            "font-semibold text-neutral-950",
            isMobile ? "text-sm mb-3" : "mb-4"
          )}>
            Ce qui est inclus
          </h3>
          <ul className={cn(isMobile ? "space-y-2" : "space-y-3")}>
            {features.slice(0, 5).map((feature, i) => (
              <li key={i} className={cn(
                "flex items-start gap-3",
                isMobile && "gap-2 text-sm"
              )}>
                <Check className={cn(
                  "text-forest-600 flex-shrink-0 mt-0.5",
                  isMobile ? "w-4 h-4" : "w-5 h-5"
                )} />
                <span className="text-neutral-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  const TechBadges = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {technologies.length > 0 && (
        <div>
          <h3 className={cn(
            "font-semibold text-neutral-600 uppercase tracking-wide",
            isMobile ? "text-xs mb-2" : "text-sm mb-3"
          )}>
            Technologies
          </h3>
          <div className={cn(
            "flex flex-wrap",
            isMobile ? "gap-1.5" : "gap-2"
          )}>
            {technologies.map((tech, i) => (
              <span
                key={i}
                className={cn(
                  "border border-neutral-300 rounded-full text-neutral-700",
                  isMobile 
                    ? "px-2.5 py-1 bg-white/60 text-xs" 
                    : "px-3 py-1 bg-neutral-100 text-sm"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const DurationInfo = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {duration && (
        <div className={cn(
          isMobile 
            ? "pt-3 border-t border-neutral-200" 
            : "flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-6 border-t border-neutral-200"
        )}>
          <div className={isMobile ? "" : "flex-1"}>
            <div className={cn(
              "text-neutral-600",
              isMobile ? "text-xs mb-1" : "text-sm mb-1"
            )}>
              {isMobile ? "Durée" : "Durée moyenne"}
            </div>
            <div className={cn(
              "font-semibold text-neutral-700",
              isMobile ? "text-sm" : "text-lg"
            )}>
              {duration}
            </div>
          </div>
          {!isMobile && (
            <Link
              href="/questionnaire"
              className="px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Simuler ce service →
            </Link>
          )}
        </div>
      )}
    </>
  );

  // === MOBILE LAYOUT ===
  
  const MobileLayout = () => (
    <div className="lg:hidden">
      <div className="relative z-10">
        <ContentHeader isMobile />
        <VisualMedia isMobile />
        <DescriptionText isMobile />

        {/* Expandable section */}
        <div className="border-t border-neutral-200 pt-4">
          <div className={cn(
            "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            !isExpanded && "grid-rows-[0fr] opacity-0",
            isExpanded && "grid-rows-[1fr] opacity-100"
          )}>
            <div className="overflow-hidden">
              <div className="space-y-4 mb-4">
                <FeaturesList isMobile />
                <TechBadges isMobile />
                <DurationInfo isMobile />
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5">
            {!isExpanded && (
              <Link
                href="/questionnaire"
                className="w-full px-5 py-2.5 bg-forest-600 hover:bg-forest-500 text-white text-center text-sm font-semibold rounded-lg transition-colors"
              >
                Simuler ce service →
              </Link>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-white/40 rounded-lg transition-colors border border-neutral-200"
            >
              <span className="text-sm font-semibold text-neutral-950">
                {isExpanded ? 'Masquer' : 'Voir les détails'}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-neutral-600 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {isExpanded && (
              <Link
                href="/questionnaire"
                className="w-full px-5 py-2.5 bg-forest-600 hover:bg-forest-500 text-white text-center text-sm font-semibold rounded-lg transition-colors"
              >
                Simuler ce service →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // === DESKTOP LAYOUT ===
  
  const DesktopLayout = () => (
    <div className={cn(
      "hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16",
      reversed && "lg:grid-flow-dense"
    )}>
      {/* Visual */}
      <div className={cn(
        reversed && "lg:col-start-2"
      )}>
        <VisualMedia />
      </div>

      {/* Content */}
      <div className={cn(
        reversed && "lg:col-start-1 lg:row-start-1"
      )}>
        <ContentHeader />
        <DescriptionText />
        
        {/* Details - Always visible on desktop */}
        <div className="border-t border-neutral-200 pt-4">
          <div className="space-y-6 mb-6">
            <FeaturesList />
            <TechBadges />
            <DurationInfo />
          </div>
        </div>
      </div>
    </div>
  );

  // === MAIN RENDER ===

  return (
    <SectionContainer 
      className="scroll-mt-20"
      gradients={sectionGradients}
      gridBgColor='bg-neutral-200'
      cellBgColor='bg-gradient-to-b from-neutral-50 to-neutral-100'
      showTopBar={false}
      showBottomBar={false}
      id={id}
    >
      <div className="py-16 lg:py-40 container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MobileLayout />
          <DesktopLayout />
        </div>
      </div>
    </SectionContainer>
  );
}