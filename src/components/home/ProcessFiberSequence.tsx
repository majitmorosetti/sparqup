"use client";


import { useEffect, useRef, useState, forwardRef, type Ref } from "react";
import ConnectorLayer from "@/components/shared/connectors/ConnectorLayer";
import Connector from "@/components/shared/connectors/Connector";

type CardProps = { title: string; subtitle: string; className?: string };

// --eslint-disable-next-line react/display-name
const CardF = forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, subtitle, className = "" },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={[
        "relative z-10 w-full max-w-md rounded-2xl border border-border/60 bg-surface-1/80 p-5 backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
    </div>
  );
});


export default function ProcessFiberSequence() {
  const s1 = useRef<HTMLDivElement | null>(null);
  const s2 = useRef<HTMLDivElement | null>(null);
  const s3 = useRef<HTMLDivElement | null>(null);
  const s4 = useRef<HTMLDivElement | null>(null);

  // Animation: un seul signal traverse S1->S2 -> S3 -> S4
  const [progress, setProgress] = useState(0); // 0..1 global
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) return; // pas d’anim
    let raf = 0;
    const durMs = 2400; // vitesse globale: 2.4s pour traverser toute la séquence
    const loop = (t0: number) => {
      const tick = () => {
        const el = performance.now() - t0;
        const p = (el % durMs) / durMs;
        setProgress(p);
        raf = requestAnimationFrame(() => tick());
      };
      tick();
    };
    raf = requestAnimationFrame(() => loop(performance.now()));
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Découpage du progress global en 3 segments (S1->S2, S2->S3, S3->S4)
  // 0..1 global → segment 0: [0, 1/3), 1: [1/3, 2/3), 2: [2/3, 1]
  const seg = progress * 3;
  const segIdx = Math.floor(seg); // 0,1,2
  const segT = Math.min(1, Math.max(0, seg - segIdx)); // 0..1 dans le segment

  // IMPORTANT: pour les inactifs → null (pas 0), afin de ne rien dessiner
  const p12 = segIdx === 0 ? segT : null;
  const p23 = segIdx === 1 ? segT : null;
  const p34 = segIdx === 2 ? segT : null;

  return (
    <ConnectorLayer className="relative z-0 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-2 md:gap-y-16 md:px-6">
        <CardF ref={s1} title="Cadrage & priorités" subtitle="Objectifs, budget, délais…" className="justify-self-end" />
        <div className="hidden md:block" />
        <div className="hidden md:block" />
        <CardF ref={s2} title="Choix du stack" subtitle="Wix/NoCode vs Next.js…" />
        <CardF ref={s3} title="Prototype & contenu" subtitle="Structure, textes, CTA…" className="justify-self-end" />
        <div className="hidden md:block" />
        <div className="hidden md:block" />
        <CardF ref={s4} title="Mise en place" subtitle="Implémentation & QA…" />
      </div>

      {/* Fibre statique + photon unique (blanc + halo violet), top→bottom */}
      <Connector fromRef={s1} toRef={s2} attach="bottom-top" className="text-sky-300" strokeW={2} pulse progress={p12} />
      <Connector fromRef={s2} toRef={s3} attach="bottom-top" className="text-sky-300" strokeW={2} pulse progress={p23} />
      <Connector fromRef={s3} toRef={s4} attach="bottom-top" className="text-sky-300" strokeW={2} pulse progress={p34} />

    </ConnectorLayer>
  );
}
