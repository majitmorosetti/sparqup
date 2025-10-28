"use client";

import { motion } from "motion/react";
import Link from "next/link";
import HeroMockTilt from "@/components/home/HeroMockTilt";

export default function Hero() {
  return (
    <section className="relative overflow-visible py-14 md:py-20">
      {/* Fond “seamless” pour toute la section, avec fondu haut/bas */}
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 -z-10",
          // on masque les bords du fond pour qu'il se fonde dans la page
          "supports-[mask-image]:[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
        ].join(" ")}
        style={{
          background: `
            radial-gradient(900px 260px at 15% 0%, color-mix(in oklab, var(--foreground), transparent 90%) 0%, transparent 70%),
            radial-gradient(900px 300px at 95% 20%, color-mix(in oklab, var(--foreground), transparent 92%) 0%, transparent 72%),
            linear-gradient(180deg, color-mix(in oklab, var(--background), transparent 0%) 0%, transparent 60%, color-mix(in oklab, var(--background), transparent 0%) 100%)
          `,
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {/* Kicker */}
        <motion.p
          className="text-sm font-medium tracking-wide text-foreground/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Conception web • Digitalisation • Automatisation
        </motion.p>

        {/* H1 */}
        <motion.h1
          className="mt-2 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Des sites qui convertissent. Des process qui s’automatisent.
        </motion.h1>

        {/* Visuel juste sous le H1 — même fond car le fond est porté par la section */}
        <div className="mt-6 md:mt-7">
          <HeroMockTilt
            src="/media/mockups/hero-dashboard.webp"
            alt="" // décoratif : le sens est donné par le H1/texte
            width={1280}
            height={800}
            perspective={900}
            tiltMaxX={18}
            tiltMaxY={22}
            inertia={0.12}
            mobileScrollTilt // tilt au scroll sur mobile
            floatAmpDeg={1.0}
            floatHz={0.085}
            magnet
            magnetScale={1.03}
            glare
            glareStrength={0.24}
            roundedClass="rounded-2xl"
            priority={false} // on laisse le texte gagner le LCP
            className="mx-auto max-w-[620px]"
            idleWobbleDeg={0.6}
            idleWobbleEverySec={3}
          />
        </div>

        {/* Texte + CTAs */}
        <motion.p
          className="mt-6 max-w-2xl text-foreground/80 px-auto text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Vitrines modernes + digitalisation + automatisations Make/Zapier,
          adaptées à votre budget.
        </motion.p>

        <motion.div
          className="mt-7 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          <Link
            href="/contact"
            className="rounded bg-foreground px-6 py-3 font-medium text-background shadow hover:opacity-90"
          >
            Discutons de votre projet
          </Link>
          <Link
            href="/portfolio"
            className="rounded border px-6 py-3 font-medium text-foreground hover:bg-foreground/5"
          >
            Voir des réalisations
          </Link>
        </motion.div>

        {/* Micro-preuve optionnelle */}
        <motion.div
          className="mt-5 text-sm text-foreground/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          Scores Lighthouse 90+ • LCP &lt; 2.2s • SEO prêt
        </motion.div>
      </div>
    </section>
  );
}
