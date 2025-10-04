"use client";

import {
  Gauge,
  Zap,
  ShieldCheck,
  Globe,
  LineChart,
  Headphones,
} from "lucide-react";

const ITEMS = [
  {
    icon: Gauge,
    title: "Performance 90+",
    desc: "Lighthouse, LCP rapide, Core Web Vitals maîtrisés.",
  },
  {
    icon: Zap,
    title: "Automatisations",
    desc: "Zapier/Make + intégrations custom orientées ROI.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité & RGPD",
    desc: "Bonnes pratiques, cookies, consent et hébergement EU.",
  },
  {
    icon: Globe,
    title: "SEO prêt",
    desc: "Balises, sitemap, données structurées, vitesse.",
  },
  {
    icon: LineChart,
    title: "Mesure claire",
    desc: "Analytics, events, dashboards décisionnels.",
  },
  {
    icon: Headphones,
    title: "Accompagnement",
    desc: "Support réactif, process simples et documentés.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-visible py-14 md:py-18">
      {/* Fond doux + masque pour transition seamless */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 supports-[mask-image]:[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        style={{
          background: `
            radial-gradient(900px 260px at 10% 0%, color-mix(in oklab, var(--foreground), transparent 92%) 0%, transparent 70%),
            radial-gradient(900px 300px at 100% 20%, color-mix(in oklab, var(--foreground), transparent 94%) 0%, transparent 72%)
          `,
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Des fondamentaux solides, taillés pour le B2B
          </h2>
          <p className="mt-3 text-foreground/75">
            On livre vite, propre, mesurable. Et on digitalise ce qui te fait
            gagner du temps — pas plus.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className={[
                "group relative overflow-hidden rounded-xl border ring-1 ring-border/60",
                "bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]",
                "transition-transform duration-200 will-change-transform hover:translate-y-[-2px]",
              ].join(" ")}
            >
              {/* légère aura au hover, sans blur lourd */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px 160px at 20% 0%, color-mix(in oklab,var(--foreground),transparent 90%), transparent 60%)",
                }}
              />
              <div className="relative p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10">
                    <Icon className="h-5 w-5 text-foreground/90" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
