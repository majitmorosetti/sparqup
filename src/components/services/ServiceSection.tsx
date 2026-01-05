// src/components/services/ServiceSection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type AspectRatio = '4/3' | '3/4' | '16/9' | '1/1' | 'auto';

interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
  pricing?: string;
  duration?: string;
  imageUrl: string;
  imageAlt: string;
  reversed?: boolean;
  imageBorder?: boolean;    // ← Border 2px
  imageShadow?: boolean;    // ← Shadow
  imageRounded?: boolean;   // ← Rounded corners
  imageObjectFit?: 'cover' | 'contain'; // ← Fit mode
  aspectRatio?: AspectRatio;
}

export default function ServiceSection({
  id,
  title,
  subtitle,
  description,
  features,
  technologies,
  pricing,
  duration,
  imageUrl,
  imageAlt,
  reversed = false,
  imageBorder = true,      // ← Défaut avec border
  imageShadow = true,      // ← Défaut avec shadow
  imageRounded = true,     // ← Défaut rounded
  imageObjectFit = 'cover',// ← Défaut cover
  aspectRatio = '4/3' // ← Défaut ratio 4/3
}: ServiceSectionProps) {

  console.log('🎨 Image config:', {
    aspectRatio,
    imageBorder,
    imageShadow,
    imageRounded,
    imageObjectFit
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const aspectClasses = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',  // ← Portrait
    'auto': '' // ← Pas de contrainte, image naturelle
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

  return (
    <section
      id={id}
      className={cn(
        "py-16 lg:py-24 scroll-mt-20",
        reversed ? "bg-neutral-50" : "bg-white"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* ============================================
              MOBILE LAYOUT (Stack vertical)
              ============================================ */}
          <div className="lg:hidden">

            {/* Subtitle */}
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-600 mb-2">
              {subtitle}
            </p>

            {/* Title */}
            <h2 className="font-heading text-3xl font-bold text-neutral-950 mb-6">
              {title}
            </h2>

            {/* Image - Hug top */}
            <div className="relative mb-6 mx-4 sm:mx-0"> {/* Bleed sur mobile si besoin */}
              <div className={imageWrapperClasses}>
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className={imageClasses}
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-neutral-700 leading-relaxed mb-6">
              {description}
            </p>

            {/* Expandable details */}
            <div className="border-t border-neutral-200 pt-6">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-left mb-4 group"
              >
                <span className="font-semibold text-neutral-950">
                  {isExpanded ? 'Masquer les détails' : 'Voir les détails'}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-neutral-600 transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {isExpanded && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-200">
                  {/* Features */}
                  {features.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-neutral-950 mb-3">
                        Ce qui est inclus
                      </h3>
                      <ul className="space-y-2">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-forest-600 flex-shrink-0 mt-1" />
                            <span className="text-sm text-neutral-700">{feature}</span>
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
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded-full text-xs text-neutral-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pricing + CTA */}
            {pricing && duration && (
              <div className="mt-6 pt-6 border-t border-neutral-200 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-neutral-600 mb-1">Tarif indicatif</div>
                    <div className="text-xl font-bold text-neutral-950">{pricing}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-600 mb-1">Durée moyenne</div>
                    <div className="text-base font-semibold text-neutral-700">{duration}</div>
                  </div>
                </div>
                <a
                  href="/questionnaire"
                  className="block w-full text-center px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Simuler ce service →
                </a>
              </div>
            )}
          </div>

          {/* ============================================
              DESKTOP LAYOUT (Side-by-side alternant)
              ============================================ */}
          <div className={cn(
            "hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16",
            reversed && "lg:grid-flow-dense"
          )}>
            
            {/* Image - Alignée en haut */}
            <div className={cn(
              "relative self-start", // ← self-start = hug top
              reversed && "lg:col-start-2"
            )}>
              <div className={imageWrapperClasses}>
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className={imageClasses}
                  sizes="50vw"
                />
              </div>
              
              {/* Accent decoratif (optionnel, masqué si pas de shadow) */}
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
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                {description}
              </p>

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-8">
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
                <div className="mb-8">
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

              {/* Pricing + CTA */}
              {pricing && duration && (
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-6 border-t border-neutral-200">
                  <div className="flex-1">
                    <div className="text-sm text-neutral-600 mb-1">Tarif indicatif</div>
                    <div className="text-2xl font-bold text-neutral-950">{pricing}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-neutral-600 mb-1">Durée moyenne</div>
                    <div className="text-lg font-semibold text-neutral-700">{duration}</div>
                  </div>
                  <a
                    href="/questionnaire"
                    className="px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Simuler ce service →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}