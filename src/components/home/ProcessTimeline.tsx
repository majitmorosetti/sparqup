// src/components/home/ProcessTimeline.tsx
'use client';

import { Search, Layers, Rocket, Zap, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Audit sans bullshit',
    description:
      "On étudie votre projet ensemble. L'objectif : identifier ce dont vous avez VRAIMENT besoin. Pas de sur-vente, pas de fonctionnalités inutiles qui gonflent la facture. Si un site vitrine simple suffit (comme Chez Joon), je vous le dis.",
    deliverable: 'Recommandations claires + estimation budgétaire réaliste',
    duration: '2-3 jours',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Conception & planning',
    description:
      "On définit la timeline en fonction de vos assets (logo, photos, textes). Pas de charte graphique ? Je peux vous guider. On choisit les bons outils, on valide l'architecture, on s'aligne sur les priorités.",
    deliverable: 'Cahier des charges + planning détaillé + maquettes si besoin',
    duration: '3-5 jours',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Développement itératif',
    description:
      "Je développe par sprints de 3-7 jours. Vous validez à chaque étape. On ajuste en temps réel si besoin. Vous voyez l'avancement en direct. Validations toutes les semaines.",
    deliverable: 'Livrables fonctionnels à chaque sprint',
    duration: '1-16 semaines selon complexité',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Automatisations & intégrations',
    description:
      "Je connecte vos outils (CRM, email, paiement, compta). J'automatise vos workflows si vous n'en avez pas encore. J'intègre de l'IA uniquement si c'est pertinent pour votre business (pas d'IA gadget qui bouffe votre budget API).",
    deliverable: 'Écosystème digital complet + process documentés',
    duration: 'Selon besoins (inclus ou extension)',
  },
  {
    icon: GraduationCap,
    number: '05',
    title: 'Formation & suivi lancement',
    description:
      "Je vous forme à 100% sur vos outils. Vous repartez autonome avec une documentation claire. Suivi rapproché pendant 2 semaines post-lancement pour corriger les bugs et ajuster si besoin. Après, vous êtes libre.",
    deliverable: 'Documentation complète + 2 semaines de support',
    duration: '2 semaines post-lancement',
  },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Ligne verticale qui se dessine progressivement
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-neutral-50">
      <Container size="lg">
        <SectionHeader 
          title="Comment on travaille ensemble"
          subtitle="Un process transparent, pas de tunnel noir, pas de surprise"
        />

        {/* Timeline alternée */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          {/* Ligne verticale statique (gris clair) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 translate-x-1/2 hidden lg:block" />
          
          {/* Ligne verticale progressive (noir) */}
          <motion.div 
            className="absolute left-1/2 top-0 w-0.5 bg-neutral-900 -translate-x-1/2 hidden lg:block origin-top"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative grid lg:grid-cols-2 mb-[-50px] gap-8 items-center ${
                    isLeft ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Card */}
                  <div className={`${isLeft ? 'lg:justify-self-end' : 'lg:justify-self-start lg:col-start-2'}`}>
                    <div className="group relative p-6 bg-white border-2 border-neutral-200 rounded-2xl shadow-sm hover:border-neutral-900 hover:shadow-xl transition-all duration-300 max-w-lg">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                              Étape {step.number}
                            </span>
                            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full font-medium">
                              {step.duration}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-neutral-950">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                        {step.description}
                      </p>

                      {/* Deliverable */}
                      <div className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-neutral-950">→</span>
                        <span className="font-medium text-neutral-800">
                          {step.deliverable}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dot central avec pulse au scroll */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <motion.div 
                      className="w-6 h-6 bg-neutral-900 border-4 border-neutral-50 rounded-full shadow-lg"
                      whileInView={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(15, 23, 42, 0.4)",
                          "0 0 0 8px rgba(15, 23, 42, 0)",
                        ]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                      viewport={{ once: false }}
                    />
                  </motion.div>

                  {/* Ligne horizontale vers le dot */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className={`hidden lg:block absolute top-1/2 w-3 h-0.5 bg-neutral-900 ${
                      isLeft ? 'right-1/2 mr-3 origin-right' : 'left-1/2 ml-3 origin-left'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom reassurance */}
        <div className="mt-40 p-8 bg-white border-2 border-neutral-900 rounded-2xl max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-neutral-950 mb-4">
              Pas de devis surprise, pas de tunnel noir
            </h3>
            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
              Vous savez exactement où vous en êtes à chaque étape.
              Budget ET timeline validés dès l&apos;audit.
              Pas de frais cachés, pas de deadline fantaisiste
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-700">
              <span className="inline-flex items-center gap-2">
                ✓ Estimation précise après audit
              </span>
              <span className="inline-flex items-center gap-2">
                ✓ Validation à chaque étape
              </span>
              <span className="inline-flex items-center gap-2">
                ✓ Vous gardez le contrôle
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}