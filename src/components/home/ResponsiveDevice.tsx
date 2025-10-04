"use client";

import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Home } from "lucide-react";

type Size = { w: number; h: number; r: number };

type Props = {
  /* Layout & animation */
  wrapperHeight?: string;
  desktop?: Size;
  iphone?: Size;
  morphMs?: number; // vitesse du morph (ms) — 350–500 conseillé
  pauseMs?: number; // pause en butée (ms) — 1400–2200 conseillé
  bounce?: number; // rebond léger (0.15–0.25)
  clampScaleUp?: boolean; // éviter d’upscaler > 1 (vrai contenu serait flou)

  /* Marges de fit (réservent de l’air pour l’ombre, sans padding CSS) */
  fitPaddingX?: number; // marge latérale (px) réservée dans le calcul
  fitPaddingTop?: number; // marge top (px)
  fitPaddingBottom?: number; // marge bottom (px) – utile pour l’ombre
};

type LatestDims = { width?: number; height?: number };

export default function ResponsiveDevice({
  wrapperHeight = "clamp(380px, 56vh, 560px)",
  desktop = { w: 560, h: 350, r: 14 }, // ~16:10
  iphone = { w: 252, h: 546, r: 18 }, // ~19.5:9
  morphMs = 420,
  pauseMs = 1800,
  bounce = 0.18,
  clampScaleUp = true,

  fitPaddingX = 8,
  fitPaddingTop = 8,
  fitPaddingBottom = 16, // un peu plus pour que l’ombre ne soit jamais coupée
}: Props) {
  const prefersReduced = useReducedMotion?.() ?? false;
  const controls = useAnimationControls();

  // Phase logique (point de départ)
  const [phase, setPhase] = useState<"desktop" | "mobile">("desktop");

  // UI live basée sur le ratio (avec hystérésis pour éviter le flip-flop au centre)
  const [isMobileUI, setIsMobileUI] = useState(false);
  const lastIsMobile = useRef(false);

  // Pause au survol
  const pausedHoverRef = useRef(false);

  // Mesure wrapper + scale (MotionValue pour éviter les re-render)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperSizeRef = useRef({ w: 0, h: 0 });
  const deviceSizeRef = useRef({ w: desktop.w, h: desktop.h });
  const scaleMv = useMotionValue(1);

  // Spring commun (même rythme partout)
  const spring: Transition = useMemo(
    () => ({
      type: "spring",
      bounce,
      duration: morphMs / 1000,
      restDelta: 0.005,
    }),
    [bounce, morphMs],
  );

  // Variants du frame (dimensions design ; le fit se fait par scale)
  const variants = useMemo(
    () => ({
      desktop: {
        width: desktop.w,
        height: desktop.h,
        borderRadius: desktop.r,
        transition: spring,
      },
      mobile: {
        width: iphone.w,
        height: iphone.h,
        borderRadius: iphone.r,
        transition: spring,
      },
    }),
    [desktop, iphone, spring],
  );

  /* Mesure du wrapper (ResizeObserver) */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      // contentRect: zone MESURÉE sans border ni scrollbar (et souvent sans padding) — on se base dessus
      wrapperSizeRef.current = { w: cr.width, h: cr.height };
      recalcScale();
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Calcul du scale (MotionValue only, pas de re-render) */
  const recalcScale = () => {
    const { w: Wc, h: Hc } = wrapperSizeRef.current;
    const { w: Wd, h: Hd } = deviceSizeRef.current;
    if (Wc > 0 && Hc > 0 && Wd > 0 && Hd > 0) {
      // On réserve de l’air : côtés = 2*fitPaddingX ; vertical = fitTop + fitBottom
      const padW = Math.max(0, Wc - fitPaddingX * 2);
      const padH = Math.max(0, Hc - (fitPaddingTop + fitPaddingBottom));
      let s = Math.min(padW / Wd, padH / Hd);
      if (clampScaleUp) s = Math.min(s, 1);
      if (Number.isFinite(s) && s > 0) {
        const prev = scaleMv.get();
        if (Math.abs(prev - s) > 0.001) scaleMv.set(s);
      }
    }
  };

  /* Boucle morph: pause longue → morph rapide → pause longue → ... */
  useEffect(() => {
    if (prefersReduced) return;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout> | null = null;

    controls.set(phase);

    const wait = (ms: number) =>
      new Promise<void>((res) => {
        let elapsed = 0;
        const step = 40;
        const tick = () => {
          if (cancelled) return;
          if (!pausedHoverRef.current) elapsed += step;
          if (elapsed >= ms) return res();
          t = setTimeout(tick, step);
        };
        t = setTimeout(tick, step);
      });

    const loop = async () => {
      if (cancelled) return;
      await wait(pauseMs);
      const next = phase === "desktop" ? "mobile" : "desktop";
      await controls.start(next); // transition définie dans variants
      if (cancelled) return;
      setPhase(next);
      loop();
    };

    loop();
    return () => {
      cancelled = true;
      if (t) clearTimeout(t);
    };
  }, [controls, phase, prefersReduced, pauseMs]);

  /* ---------- Render ---------- */

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full overflow-hidden"
      style={{ height: wrapperHeight }}
      onMouseEnter={() => (pausedHoverRef.current = true)}
      onMouseLeave={() => (pausedHoverRef.current = false)}
    >
      <motion.div
        className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          overflow-hidden bg-white
          ring-1 ring-black/8
          shadow-[0_10px_20px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]
          md:shadow-[0_14px_24px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.06)]
          transform-gpu
        "
        style={{
          contain: "content",
          willChange: "width, height, border-radius, transform",
          scale: scaleMv,
          transformOrigin: "50% 50%",
        }}
        variants={variants}
        initial={phase}
        animate={prefersReduced ? undefined : controls}
        onUpdate={(latest: LatestDims) => {
          // Live ratio → UI mobile/desktop (hystérésis 2%) + recalc scale (refs only)
          const w = typeof latest.width === "number" ? latest.width : undefined;
          const h =
            typeof latest.height === "number" ? latest.height : undefined;
          if (w && h) {
            deviceSizeRef.current = { w, h };
            recalcScale();

            const ratio = h / w;
            const cur = lastIsMobile.current;
            const next = cur
              ? ratio > 0.98 /* revenir desktop si < 0.98 */
              : ratio > 1.02; /* passer mobile si > 1.02 */
            if (next !== cur) {
              lastIsMobile.current = next;
              setIsMobileUI(next); // faible fréquence, pas de jitter
            }
          }
        }}
      >
        {/* Top bar (chrome) — synchro au morph */}
        <TopBar isMobile={isMobileUI} barSpring={spring} />

        {/* Viewport “page web” avec placeholders */}
        <Viewport>
          <HeroWireframe isMobile={isMobileUI} spring={spring} />
        </Viewport>
      </motion.div>
    </div>
  );
}

/* ---------------- subcomponents ---------------- */

function TopBar({
  isMobile,
  barSpring,
}: {
  isMobile: boolean;
  barSpring: Transition;
}) {
  const height = isMobile ? "12%" : "8%";
  return (
    <motion.div
      className="relative w-full border-b border-black/10 bg-black/70 text-white"
      animate={{ height }}
      transition={barSpring}
    >
      <div className="flex h-full items-center justify-between gap-2 px-3">
        {/* Gauche : Home (mobile) ou pastilles macOS (desktop) */}
        <div className="flex items-center min-w-[24px]">
          {isMobile ? (
            <Home className="h-4 w-4 text-white/80" aria-hidden />
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
          )}
        </div>

        {/* Barre d’adresse factice */}
        <motion.div
          className="mx-2 h-3 flex-1 rounded bg-white/15"
          transition={barSpring}
        />
        <motion.div
          className="h-3 w-6 rounded bg-white/25"
          transition={barSpring}
        />
      </div>
    </motion.div>
  );
}

function Viewport({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[calc(100%-1px)] w-full overflow-hidden bg-white">
      {children}
    </div>
  );
}

/** Wireframe hero : placeholders explicites sans texte, teintes selon format */
function HeroWireframe({
  isMobile,
  spring,
}: {
  isMobile: boolean;
  spring: Transition;
}) {
  // Teintes différentes selon le format (mobile = un poil plus foncé)
  const colorBlock = isMobile
    ? "#d1d5db" /* neutral-300 */
    : "#e5e7eb"; /* neutral-200 */
  const colorStrong = isMobile
    ? "#9ca3af" /* neutral-400 */
    : "#d4d4d8"; /* zinc-300 */

  const isDesk = !isMobile;

  return (
    <div
      className="absolute inset-0 p-[5%]"
      style={{
        display: "grid",
        gridTemplateColumns: isDesk ? "1.15fr 0.85fr" : "1fr",
        gap: isDesk ? "4%" : "5%",
      }}
    >
      {/* Colonne texte */}
      <div className="flex min-w-0 flex-col">
        {/* H1 (plus foncé) */}
        <motion.div
          className="rounded-md"
          animate={{ backgroundColor: colorStrong }}
          transition={spring}
          style={{
            height: isDesk ? "14%" : "12%",
            width: isDesk ? "92%" : "90%",
          }}
        />
        {/* Description */}
        <motion.div
          className="mt-[2.5%] rounded-md"
          animate={{ backgroundColor: colorBlock }}
          transition={spring}
          style={{
            height: isDesk ? "8%" : "7.5%",
            width: isDesk ? "84%" : "92%",
          }}
        />
        {/* CTAs */}
        <div className="mt-auto flex items-center gap-[3%]">
          <motion.div
            className="rounded-md"
            animate={{ backgroundColor: colorStrong }}
            transition={spring}
            style={{
              height: "10%",
              minHeight: 28,
              width: isDesk ? "34%" : "60%",
            }}
          />
          <motion.div
            className="rounded-md"
            animate={{ backgroundColor: colorBlock }}
            transition={spring}
            style={{
              height: "10%",
              minHeight: 28,
              width: isDesk ? "24%" : "32%",
            }}
          />
        </div>
      </div>

      {/* Colonne image */}
      <div className="flex h-full items-center justify-center">
        <motion.div
          className="rounded-md"
          animate={{ backgroundColor: colorBlock }}
          transition={spring}
          style={{ height: isDesk ? "78%" : "36%", width: "100%" }}
        />
      </div>
    </div>
  );
}
