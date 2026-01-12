// src/components/homepage/ServicesGrid.tsx
'use client';

import { SERVICES } from '@/lib/services-data';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ServiceSection from '../services/ServiceSection';

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-neutral-50 mt-10">
      <div className="container mx-auto px-4">
        <SectionHeader 
                  title="Solutions"
                  subtitle="Des offres concrètes pour digitaliser votre business de A à Z avec les outils dont vous avez besoin."
                />

        {/* Services détaillés */}
              {SERVICES.map((service, index) => {
                const IconComponent = service.icon; // ← Récupère le composant Lucide
                const isReversed = index % 2 !== 0; // Alterne gauche/droite
        
                return (
                  <ServiceSection
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    subtitle={service.subtitle}
                    description={service.description}
                    fullDescription={service.fullDescription}
                    icon={<IconComponent className="w-12 h-12 text-forest-700" />}
                    features={service.includes || []}
                    technologies={service.technologies || []}
                    pricing={service.pricing}
                    duration={service.duration}
                    imageUrl={`/media/services/${service.id}.png`}
                    imageAlt={`${service.title} - SparqUp`}
                    reversed={isReversed}
                    // Customize par service si besoin
                    imageBorder={service.imageConfig?.border ?? true}
                    imageShadow={service.imageConfig?.shadow ?? true}
                    imageRounded={service.imageConfig?.rounded ?? true}
                    imageObjectFit={service.imageConfig?.objectFit || 'cover'}
                    aspectRatio={service.imageConfig?.aspectRatio }
                  />
                );
              })}

        <div className="text-center mt-12">
          <a
            href="/questionnaire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-lg font-bold hover:bg-neutral-800 transition-colors"
          >
            Simuler mon projet
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}