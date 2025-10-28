"use client";

import { Zap, Link2, Brain } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Un site rapide et moderne",
      desc: "Pages ultra-légères, SEO prêt, hébergement sur Vercel. Tout s’affiche en moins de 2 secondes.",
    },
    {
      icon: <Link2 className="h-6 w-6 text-primary" />,
      title: "Vos outils connectés",
      desc: "CRM, email, Notion, Make : on relie votre site à votre stack sans ligne de code supplémentaire.",
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Un système qui apprend",
      desc: "Formulaires intelligents, suivi d’audience, automatisations : vos données deviennent des actions.",
    },
  ];

  return (
    <section
      id="features"
      className="relative isolate w-full py-20 bg-surface-1 text-foreground"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Ce que vous obtenez avec Sparqup
        </h2>
        <p className="mt-3 text-base text-muted md:text-lg">
          Des sites performants, connectés à vos outils, conçus pour travailler à votre place.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)]"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Voir les projets clients
          </a>
        </div>
      </div>
    </section>
  );
}
