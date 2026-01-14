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
  pricing?: string; // ← Ajoute ça
  duration: string;  // ← Et ça
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

  // Split la description
  const [hookText, fullText] = description.includes('|') 
    ? description.split('|')
    : [description, ''];

  const aspectClasses = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    'auto': ''
  };

  const imageWrapperClasses = cn(
    "relative overflow-hidden",
    aspectClasses[aspectRatio],
    imageRounded && "rounded-2xl",
    imageBorder && "border-2 border-neutral-200",
    imageShadow && "shadow-xl"
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
  return (
    <SectionContainer 
                  className="scroll-mt-20 "
                  gradients={sectionGradients}
                  gridBgColor='bg-neutral-200'
                  cellBgColor='bg-gradient-to-b from-neutral-50 to-neutral-100'
                  showTopBar={false}
                  showBottomBar={false}
                  id="Solutions-Header"
                >
      <div className="py-16 lg:py-40  container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ============================================
              MOBILE LAYOUT
              ============================================ */}
          <div className="lg:hidden">
            
              

              {/* Content */}
              <div className="relative z-10">
                {/* Subtitle */}
                <p className="text-sm font-semibold uppercase tracking-wide text-forest-600 mb-2">
                  {subtitle}
                </p>

                {/* Title */}
                <h2 className="font-heading text-3xl sm:text-3xl font-bold text-neutral-950 mb-4">
                  {title}
                </h2>
 
                {/* Image */}
                <div className='py-4'>
                { SVG? (
                    <div className="w-full h-full justify-center my-6 items-center"> {/* ← Ajoute bg pour voir le container */}
                      <SVG />
                    </div>
                  ) : (
                    <div className={cn("relative w-full h-full mb-4 overflow-hidden",
                      imageWrapperClasses
                    )}>
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className={imageClasses}
                        sizes="100vw"
                      />
                    </div>
                  )}
                </div>
                {/* Description */}
                <div className="text-base text-neutral-700 leading-relaxed mb-6">
                  <p className="text-neutral-800 mb-2">
                    {hookText}
                  </p>
                  
                  {/* Full description avec grid transition */}
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      !isExpanded && "grid-rows-[0fr] opacity-0",
                      isExpanded && "grid-rows-[1fr] opacity-100"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-2">
                        {fullText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expandable section */}
                <div className="border-t border-neutral-200 pt-4">
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      !isExpanded && "grid-rows-[0fr] opacity-0",
                      isExpanded && "grid-rows-[1fr] opacity-100"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-4 mb-4">
                        {/* Features */}
                        {features.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-neutral-950 mb-3">
                              Ce qui est inclus
                            </h3>
                            <ul className="space-y-2">
                              {features.slice(0, 5).map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <Check className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-neutral-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies */}
                        {technologies.length > 0 && (
                          <div>
                            <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-2">
                              Technologies
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                              {technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 bg-white/60 border border-neutral-300 rounded-full text-xs text-neutral-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Duration */}
                        {duration && (
                          <div className="pt-3 border-t border-neutral-200">
                            <div className="text-xs text-neutral-600 mb-1">Durée</div>
                            <div className="text-sm font-semibold text-neutral-700">{duration}</div>
                          </div>
                        )}
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


          {/* ============================================
              DESKTOP LAYOUT
              ============================================ */}
          <div className={cn(
            "hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16",
            reversed && "lg:grid-flow-dense"
          )}>
            
            {/* Image */}
            <div className={cn(
              "relative self-center",
              reversed && "lg:col-start-2"
            )}>
                { SVG? (
                    <div className="w-full flex justify-center items-center py-8"> 
                      <SVG />
                    </div>
                  ) : (
                    <div className={cn("relative h-100 mb-4 overflow-hidden", imageWrapperClasses)}>
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className={imageClasses}
                        sizes="100vw"
                      />
                    </div>
                  )}
              
              {/* Accent décoratif */}
              {imageShadow && (
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-forest-600 rounded-2xl -z-10 opacity-10" />
              )}
            </div>

            {/* Contenu */}
            <div className={cn(
              reversed && "lg:col-start-1 lg:row-start-1"
            )}>
              {/* Subtitle */}
              <p className="text-sm font-semibold uppercase tracking-wide text-forest-600 mb-3">
                {subtitle}
              </p>

              {/* Title */}
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-950 mb-6">
                {title}
              </h2>

              {/* Description */}
              <div className="text-lg text-neutral-800 leading-relaxed mb-4">
                {/* Hook toujours visible */}
                <p className="mb-3">
                  {hookText}
                </p>
                
                {/* Full description avec grid transition */}
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    !isExpanded && "grid-rows-[0fr] opacity-0",
                    isExpanded && "grid-rows-[1fr] opacity-100"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pt-2">
                      {fullText}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Expandable details */}
              <div className="border-t border-neutral-200 pt-4">
                <div
                  className=
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] grid-rows-[1fr] opacity-100"
                     >
                  <div className="overflow-hidden">
                    <div className="space-y-6 mb-6">
                      {/* Features */}
                      {features.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-neutral-950 mb-4">
                            Ce qui est inclus
                          </h3>
                          <ul className="space-y-3">
                            {features.slice(0, 5).map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      {technologies.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-3">
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-neutral-100 border border-neutral-300 rounded-full text-sm text-neutral-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Duration + CTA */}
                      {duration && (
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-6 border-t border-neutral-200">
                          <div className="flex-1">
                            <div className="text-sm text-neutral-600 mb-1">Durée moyenne</div>
                            <div className="text-lg font-semibold text-neutral-700">{duration}</div>
                          </div>
                          <Link
                            href="/questionnaire"
                            className="px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                          >
                            Simuler ce service →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}