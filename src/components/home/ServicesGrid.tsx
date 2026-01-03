// src/components/homepage/ServicesGrid.tsx
'use client';

import { SERVICES } from '@/lib/services-data';
import { ArrowRight } from 'lucide-react';

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-neutral-50 mt-10">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12 max-w-7xl px-12 mx-auto">
          <h2 className="text-5xl font-bold text-neutral-950 mb-4">
            Solutions
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl">
            Des offres concrètes pour digitaliser votre business de A à Z avec les outils dont vous avez besoin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <a
                key={service.id}
                href={`/services#${service.id}`}
                className={`group relative block p-8 rounded-2xl border-2 border-neutral-200 overflow-hidden transition-all hover:border-neutral-900 hover:scale-[1.02]`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <IconComponent className={`w-12 h-12 mb-4 text-neutral-900 group-hover:${service.text_focus_color} transition-colors`} />
                  
                  <h3 className={`text-2xl font-bold mb-2 text-neutral-950 group-hover:${service.text_focus_color} transition-colors`}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-sm font-medium mb-4 text-neutral-600 group-hover:${service.text_focus_color} group-hover:opacity-90 transition-colors`}>
                    {service.subtitle}
                  </p>
                  
                  <p className={`text-neutral-700 mb-6 leading-relaxed group-hover:${service.text_focus_color} group-hover:opacity-90 transition-colors`}>
                    {service.description}
                  </p>

                  <div className={`flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:${service.text_focus_color} group-hover:gap-3 transition-all`}>
                    {service.CTA || 'En savoir plus'}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

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