// src/components/home/SolutionsGrid.tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/services-data';
import { cn } from '@/lib/utils';
import SectionContainer from '@/components/ui/SectionContainer';
import StackedCards from '../ui/StackedCards';
import DigitalizationGrid from '../DigitalizationGrid/DigitalizationGrid';



export default function SolutionsGrid() {

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
      className="bg-neutral-50"
      gradients={sectionGradients}
      showTopGradient
      gridBgColor='bg-neutral-200'
      cellBgColor='bg-gradient-to-b from-neutral-50 to-neutral-100'
      gradientFromColor="from-neutral-50"
      gradientHeight="h-24"
    >      {/* Header */}
      {/* Grid pattern background subtil */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)'
        }}
      />

      {/* Header */}
      <div className="max-w-3xl px-4 py-4 md:px-8 md:py-8 mb-8  relative z-10">
        <p className="text-forest-600 font-medium mb-4 text-sm">
          Solutions
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 mb-6 leading-tight">
          Des résultats concrets,
          <br />
          pas des promesses.
        </h2>
        <p className="text-xl text-neutral-600 leading-relaxed">
          Automatisation, développement, digitalisation : des solutions qui génèrent 
          des gains mesurables pour votre business.
        </p>
      </div>

      {/* Mosaic Grid */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px relative overflow-hidden ">
            {/* ✅ Background pattern animé */}
                <div 
                className="absolute inset-0 -z-10 animate-grid-scroll"
                style={{
                    backgroundColor: '#d2f6dd', 
                    backgroundImage: `
                    linear-gradient(#c3e7ce 1px, transparent 1px),
                    linear-gradient(90deg, #c3e7ce 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                }}
                />
          {SERVICES.map((service, index) => {
            
            
            const layouts = [
              'md:col-span-1 md:row-span-1',
              'md:col-span-1 md:row-span-1',
              'md:col-span-1 md:row-span-1',
              'md:col-span-2 md:row-span-1',
              'md:col-span-1 md:row-span-1',
              'md:col-span-2 md:row-span-1',
              'md:col-span-1 md:row-span-1',
            ];

            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className={cn(
                  "group relative bg-white p-4 lg:p-8",
                  "hover:bg-neutral-50 transition-colors duration-200",
                  "hover:border hover:border-forest-600",
                  layouts[index % layouts.length]
                )}
              >
                
                {/* Content */}
                <div className="space-y-3 mb-8 md:mb-0">
                  <h3 className="text-2xl font-semibold text-neutral-950 group-hover:text-forest-700 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {service.description.split('|')[0]}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-forest-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className=" px-4 py-8 md:px-8 md:py-16 mt-16 lg:mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 pt-16 relative z-10">
        <div className="max-w-2xl">
          <h3 className="text-3xl font-semibold text-neutral-950 mb-3">
            Prêt à digitaliser votre business ?
          </h3>
          <p className="text-neutral-600">
            Obtenez une estimation personnalisée en moins de 5 minutes.
          </p>
        </div>
        <Link
          href="/questionnaire"
          className="group inline-flex items-center gap-3 px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          Simuler mon projet
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="my-20">
        <StackedCards />
        <DigitalizationGrid />
      </div>
    </SectionContainer>
  );
}