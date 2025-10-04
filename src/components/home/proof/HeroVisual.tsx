"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  LayoutDashboard,
  Mail,
  Database,
  Cog,
  Workflow,
  Zap,
  Bot,
  Plug,
} from "lucide-react";
import type { ReactNode } from "react";

type Props = { className?: string };

/* ===== Easings typés ===== */
const E_LINEAR = (t: number) => t;
const E_EASE_INOUT: [number, number, number, number] = [0.45, 0, 0.55, 1];

export default function HeroVisual({ className = "" }: Props) {
  const prefersReduced = useReducedMotion();
  const uid = useId();

  /* ===== Helpers d’animation (formes stables) ===== */

  // flottement doux – on garde la même shape même si reduced-motion
  const floatAnim = (delay = 0, delta = 6, dur = 6) =>
    prefersReduced
      ? {
          y: 0,
          transition: {
            duration: 0,
            ease: E_LINEAR,
            repeat: 0,
            repeatType: "loop" as const,
            delay,
          },
        }
      : {
          y: [0, -delta, 0],
          transition: {
            duration: dur,
            ease: E_EASE_INOUT,
            repeat: Infinity,
            repeatType: "mirror" as const,
            delay,
          },
        };

  // animation de ligne “synapse”
  const lineAnim = prefersReduced ? {} : { strokeDashoffset: [-40, 0] };

  // transition pour lignes
  const lineTrans = (dur: number, delay = 0) =>
    prefersReduced
      ? { duration: 0, ease: E_LINEAR, repeat: 0, delay: 0 }
      : { duration: dur, ease: E_LINEAR, repeat: Infinity, delay };

  return (
    <section
      className={[
        "relative isolate overflow-hidden [contain:paint]",
        "rounded-2xl border ring-1 ring-border/60 bg-gradient-to-b from-background/50 to-background/70",
        "px-4 py-5 md:px-6 md:py-7",
        className,
      ].join(" ")}
      aria-label="Aperçu : site, digitalisation, automatisation"
    >
      {/* ===== FLUX (SVG) — Mobile ===== */}
      <svg
        className="pointer-events-none absolute inset-0 block md:hidden"
        viewBox="0 0 1000 600"
        aria-hidden
      >
        <defs>
          <filter
            id={`glow-${uid}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`flux-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 180 160 C 300 170, 520 210, 760 250"
          fill="none"
          stroke={`url(#flux-${uid})`}
          strokeWidth="2.4"
          strokeDasharray="12 10"
          filter={`url(#glow-${uid})`}
          initial={{ strokeDashoffset: 0 }}
          animate={lineAnim}
          transition={lineTrans(6)}
          className="text-foreground/45"
        />
        <motion.path
          d="M 760 270 C 640 360, 520 440, 360 490"
          fill="none"
          stroke={`url(#flux-${uid})`}
          strokeWidth="2.4"
          strokeDasharray="10 8"
          filter={`url(#glow-${uid})`}
          initial={{ strokeDashoffset: 0 }}
          animate={lineAnim}
          transition={{ ...lineTrans(7.5, 0.3) }}
          className="text-foreground/35"
        />
      </svg>

      {/* ===== FLUX (SVG) — Desktop ===== */}
      <svg
        className="pointer-events-none absolute inset-0 hidden md:block"
        viewBox="0 0 1200 500"
        aria-hidden
      >
        <defs>
          <filter
            id={`glow2-${uid}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`flux2-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 220 220 C 420 160, 780 140, 980 160"
          fill="none"
          stroke={`url(#flux2-${uid})`}
          strokeWidth="2.6"
          strokeDasharray="14 10"
          filter={`url(#glow2-${uid})`}
          initial={{ strokeDashoffset: 0 }}
          animate={lineAnim}
          transition={lineTrans(7.2)}
          className="text-foreground/45"
        />
        <motion.path
          d="M 240 260 C 460 300, 760 360, 980 380"
          fill="none"
          stroke={`url(#flux2-${uid})`}
          strokeWidth="2.6"
          strokeDasharray="12 9"
          filter={`url(#glow2-${uid})`}
          initial={{ strokeDashoffset: 0 }}
          animate={lineAnim}
          transition={{ ...lineTrans(6.2, 0.25) }}
          className="text-foreground/35"
        />
        <motion.path
          d="M 980 180 C 900 220, 900 320, 980 360"
          fill="none"
          stroke={`url(#flux2-${uid})`}
          strokeWidth="2.4"
          strokeDasharray="10 8"
          filter={`url(#glow2-${uid})`}
          initial={{ strokeDashoffset: 0 }}
          animate={lineAnim}
          transition={{ ...lineTrans(5.6, 0.6) }}
          className="text-foreground/30"
        />
      </svg>

      {/* ===== Layout 3 blocs ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        <motion.div
          className="md:col-span-6 rounded-xl border bg-surface-1/80 backdrop-blur-md ring-1 ring-border/60 p-4"
          initial={false}
          animate={floatAnim(0.1, 6, 7)}
        >
          <BlockHeader
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Site / Dashboard"
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-lg bg-foreground/10" />
            <div className="h-16 rounded-lg bg-foreground/10" />
            <div className="h-16 rounded-lg bg-foreground/10" />
          </div>
          <div className="mt-2 h-2 w-2/3 rounded bg-foreground/15" />
        </motion.div>

        <motion.div
          className="md:col-span-3 rounded-xl border bg-surface-1/80 backdrop-blur-md ring-1 ring-border/60 p-4"
          initial={false}
          animate={floatAnim(0.2, 7, 6.5)}
        >
          <BlockHeader
            icon={<Cog className="h-5 w-5" />}
            title="Digitalisation"
          />
          <ul className="mt-3 space-y-2 text-sm">
            <LI icon={<Mail className="h-4 w-4 opacity-80" />}>
              Mailer &amp; DNS
            </LI>
            <LI icon={<Database className="h-4 w-4 opacity-80" />}>
              CRM / Contacts
            </LI>
            <LI icon={<Plug className="h-4 w-4 opacity-80" />}>
              Outils métier
            </LI>
          </ul>
        </motion.div>

        <motion.div
          className="md:col-span-3 rounded-xl border bg-surface-1/80 backdrop-blur-md ring-1 ring-border/60 p-4"
          initial={false}
          animate={floatAnim(0.3, 8, 7.5)}
        >
          <BlockHeader
            icon={<Workflow className="h-5 w-5" />}
            title="Automatisation"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Chip icon={<Zap className="h-3.5 w-3.5" />} label="Zapier" />
            <Chip icon={<Bot className="h-3.5 w-3.5" />} label="Custom" />
            <Chip emoji="🟣" label="Make" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <LogLine ok label="Lead ➜ CRM" />
            <LogLine label="Commande ➜ Facture" />
            <LogLine label="Tag lead ➜ Email" />
            <LogLine ok label="Stock ➜ Site" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================== sous-composants ================== */

function BlockHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground/90">
      {icon}
      <h3 className="text-base font-semibold">{title}</h3>
    </div>
  );
}

function LI({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </li>
  );
}

function Chip({
  icon,
  emoji,
  label,
}: {
  icon?: ReactNode;
  emoji?: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-foreground/10 px-2.5 py-1 text-xs text-foreground">
      {icon ?? (emoji ? <span className="text-[12px]">{emoji}</span> : null)}
      <span>{label}</span>
    </span>
  );
}

function LogLine({ label, ok = false }: { label: string; ok?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-foreground/7 px-2 py-1 ring-1 ring-border/60">
      <span className={ok ? "text-emerald-500" : "text-foreground/50"}>●</span>
      <span>{label}</span>
    </span>
  );
}
