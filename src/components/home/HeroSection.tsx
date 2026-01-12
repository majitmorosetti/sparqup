//  src/components/home/HeroSection.tsx

'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';


export default function HeroSection() {



  return (
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-forest-900">
        {/* Image de fond */}
        {/* <div className="absolute inset-0 z-0">
          <Image
            src="/media/hero/photo-freelance-9-blur.png"
            alt=""
            fill
            className="object-cover brightness-80"
            priority
            quality={85}
          />
        </div> */}

        {/* Contenu */}
        <Container size="lg" className="relative z-10 pt-45 pb-25 text-center max-w-5xl">
          

          {/* H1 - Texte blanc pur */}
          <h1 className="text-5xl sm:text-4xl lg:text-7xl text-neutral-200 mb-6 font-heading"
            >
            De la première maquette
            <br />
            <span className="text-forest-400 font-heading">au site en ligne</span>
          </h1>

          {/* Sous-titre - Contraste suffisant */}
          <p className="text-sm sm:text-lg text-neutral-300 mb-6 max-w-3xl mx-auto leading-relaxed" 
          style={{
              textShadow: `
                0 0 40px rgba(0, 0, 0, 0.8),
                0 0 80px rgba(0, 0, 0, 0.6),
                0 0 120px rgba(0, 0, 0, 0.4),
                0 4px 20px rgba(0, 0, 0, 0.5)
              `
              }}>
            Développement web & automatisation pour TPE/PME <br /> 
            Sans jargon, avec résultats
          </p>

          {/* CTAs - Contraste maximal */}
          <div className="flex flex-col gap-4 justify-center items-center mt-12">
            {/* Primary CTA: Blanc sur noir */}
            <Link href="/questionnaire">
              <Button 
                variant="primary" 
                size="lg" 
                className="group bg-forest-100 hover:text-black text-neutral-900 hover:bg-white transition duration-300 ease-in-out"
              >
                <span>Estimer mon projet</span>

              </Button>
            </Link>

            {/* Secondary CTA: lien texte*/}
            <Link href="/questionnaire?preset=tech" className='text-forest-500 flex flex-row gap-1'>
              <span>Projet technique (API, SaaS)</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </Container>
      </div>
  );
}