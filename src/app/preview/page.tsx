"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls, AnimatePresence } from "motion/react";

/** Deux états : Desktop (16:9) ⇄ Mobile (~19.5:9). */
type Mode = "desktop" | "mobile";

type Frame = {
  mode: Mode;
  w: number;
  h: number;
  r: number; // borderRadius en rem
  label: string;
};

type Props = {
  /** Largeur max du showcase (le cadre sera scalé pour y tenir) */
  maxWidth?: number;
  /** Hauteur max du showcase (vh conseillé). Ex: 70 = 70vh */
  maxVh?: number;
  /** Durée d’une transition (s) */
  transitionSec?: number;
  /** Pause sur chaque état (s) */
  pauseSec?: number;
  /** Facteur d’overshoot (rebond) — 1 = aucun */
  overshoot?: number;
  /** Afficher le label "Desktop/Mobile" */
  showLabel?: boolean;
  /** Override des tailles exactes */
  sizes?: Partial<Record<Mode, { w: number; h: number }>>;
};

export default function ResponsivePreview({
  maxWidth = 1100, // conteneur stable
  maxVh = 70, // 70vh par défaut
  transitionSec = 0.7, // pour “voir” le rearrangement
  pauseSec = 2.0, // temps de lecture
  overshoot = 1.03, // rebond discret
  showLabel = true,
  sizes,
}: Props) {
  // Ratios/tailles exacts + overrides éventuels
  const frames: Frame[] = useMemo(() => {
    const def: Record<
      Mode,
      { w: number; h: number; r: number; label: string }
    > = {
      desktop: { w: 1280, h: 720, r: 1, label: "Desktop (16:9)" },
      mobile: { w: 390, h: 844, r: 1.25, label: "Mobile (≈19.5:9)" },
    };
    const d = sizes?.desktop ?? { w: def.desktop.w, h: def.desktop.h };
    const m = sizes?.mobile ?? { w: def.mobile.w, h: def.mobile.h };
    return [
      {
        mode: "desktop",
        w: d.w,
        h: d.h,
        r: def.desktop.r,
        label: def.desktop.label,
      },
      {
        mode: "mobile",
        w: m.w,
        h: m.h,
        r: def.mobile.r,
        label: def.mobile.label,
      },
    ];
  }, [sizes]);

  // Préférence OS reduced motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Contrôle de l’animation (taille/rayon)
  const controls = useAnimationControls();
  const [idx, setIdx] = useState(0); // 0 = desktop, 1 = mobile
  const cur = useRef(frames[0]);

  // ---- Scale auto pour contenir le cadre (ratio préservé) ----
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      // on calcule le scale pour que le frame (dans son état courant) tienne dans le wrapper visible
      const wrapW = el.clientWidth;
      const wrapH = el.clientHeight;
      const needW = cur.current.w;
      const needH = cur.current.h;
      const s = Math.min(wrapW / needW, wrapH / needH, 1); // jamais > 1 (pas d’upscale)
      setScale(Number.isFinite(s) ? s : 1);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Helpers
  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // Séquence : Desktop -> Mobile -> Desktop ...
  useEffect(() => {
    let cancelled = false;

    async function run() {
      await controls.set({
        width: `${cur.current.w}px`,
        height: `${cur.current.h}px`,
        borderRadius: `${cur.current.r}rem`,
      });

      // boucle infinie
      while (!cancelled) {
        // Desktop -> Mobile
        await animateTo(1);
        if (cancelled) return;
        await wait(pauseSec * 1000);

        // Mobile -> Desktop
        await animateTo(0);
        if (cancelled) return;
        await wait(pauseSec * 1000);
      }
    }

    async function animateTo(nextIndex: number) {
      const from = cur.current;
      const to = frames[nextIndex];
      setIdx(nextIndex);

      if (prefersReduced || overshoot === 1) {
        await controls.start({
          width: `${to.w}px`,
          height: `${to.h}px`,
          borderRadius: `${to.r}rem`,
          transition: {
            duration: Math.min(0.35, transitionSec),
            ease: "easeInOut",
          },
        });
      } else {
        const overW = Math.round(to.w * overshoot);
        const overH = Math.round(to.h * overshoot);
        await controls.start({
          width: [`${from.w}px`, `${overW}px`, `${to.w}px`],
          height: [`${from.h}px`, `${overH}px`, `${to.h}px`],
          borderRadius: [`${from.r}rem`, `${to.r}rem`, `${to.r}rem`],
          transition: {
            duration: transitionSec,
            times: [0, 0.7, 1],
            ease: ["easeOut", "easeOut", "easeOut"],
          },
        });
      }

      cur.current = to;

      // recalcul du scale une fois la taille cible atteinte
      const el = wrapperRef.current;
      if (el) {
        const wrapW = el.clientWidth;
        const wrapH = el.clientHeight;
        const s = Math.min(wrapW / to.w, wrapH / to.h, 1);
        setScale(Number.isFinite(s) ? s : 1);
      }
    }

    run();
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, frames, overshoot, pauseSec, transitionSec, prefersReduced]);

  const isMobile = frames[idx].mode === "mobile";

  // ---- NAV items (desktop) ----
  const navItems = [
    "Accueil",
    "À propos",
    "Services",
    "Tarifs",
    "Blog",
    "Contact",
  ];

  return (
    <div
      ref={wrapperRef}
      className="w-full"
      style={{
        maxWidth, // largeur max du showcase
        height: `min(${maxVh}vh, 720px)`, // et hauteur max (limite absolue douce)
        position: "relative",
      }}
    >
      {/* Scaler : garantit que le frame tient dans le wrapper sans déformer le ratio */}
      <div
        className="absolute left-1/2 top-1/2 origin-top-left"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {/* Cadre animé (navigateur + contenu) */}
        <motion.div
          animate={controls}
          layout
          transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
          className="relative mx-auto overflow-hidden rounded-2xl border shadow-xl bg-background text-foreground"
          role="img"
          aria-label="Aperçu responsive animé : desktop ⇄ mobile (ratios exacts)"
          style={
            {
              // NB: width/height animés en px par Motion
              // Pas de maxWidth/maxHeight ici (on gère via le 'scale' parent)
            }
          }
        >
          {/* Label */}
          {showLabel && (
            <div className="absolute right-3 top-2 z-10 rounded-full bg-foreground/10 px-2.5 py-1 text-[11px]">
              {frames[idx].label}
            </div>
          )}

          {/* Barre de navigateur simulée */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-3 border-b bg-background/80 px-3 py-2">
            <div className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="h-6 min-w-[140px] rounded bg-foreground/10" />
          </div>

          {/* Mini site */}
          <motion.div
            className="grid"
            layout
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            {/* Header du site */}
            <motion.header
              className="flex items-center justify-between gap-3 border-b px-3 py-2"
              layout
            >
              {/* Logo + nom (nom masqué en mobile pour illustrer la compaction) */}
              <div className="inline-flex items-center gap-2">
                <div className="h-[22px] w-[22px] rounded-md bg-foreground" />
                {!isMobile && (
                  <span className="text-sm font-semibold">Sparqup</span>
                )}
              </div>

              {/* SLOT partagé pour absorber nav ⇄ hamburger */}
              <motion.div
                layoutId="navSlot"
                layout
                className="flex min-h-6 items-center justify-center"
                transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
              >
                <AnimatePresence mode="popLayout">
                  {!isMobile ? (
                    // NAV DESKTOP
                    <motion.nav
                      key="nav-desktop"
                      layout
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="hidden items-center gap-4 md:flex"
                    >
                      {navItems.map((label) => (
                        <span
                          key={label}
                          className="inline-block rounded-full px-2 py-1 text-xs text-foreground/80 hover:bg-foreground/10"
                        >
                          {label}
                        </span>
                      ))}
                    </motion.nav>
                  ) : (
                    // HAMBURGER MOBILE
                    <motion.button
                      key="nav-mobile"
                      type="button"
                      aria-label="Ouvrir le menu"
                      layout
                      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.95, rotate: 5 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="relative block h-[18px] w-[26px] md:hidden"
                    >
                      <span className="absolute left-0 right-0 top-0 h-[2px] rounded-full bg-foreground" />
                      <span className="absolute left-0 right-0 top-[8px] h-[2px] w-[70%] rounded-full bg-foreground" />
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] w-[55%] rounded-full bg-foreground" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Actions droites (CTA) — se compacte en mobile */}
              <motion.div layout className="flex items-center gap-2">
                {!isMobile && (
                  <motion.span
                    layout
                    className="inline-block rounded-md border px-3 py-2 text-xs"
                  >
                    Contact
                  </motion.span>
                )}
                <motion.span
                  layout
                  className="inline-block rounded-md border px-3 py-2 text-xs"
                >
                  Démarrer
                </motion.span>
              </motion.div>
            </motion.header>

            {/* Contenu de page (sans sidebar pour un site typique moderne) */}
            <motion.main layout className="grid gap-6 p-4">
              {/* Hero visuel */}
              <motion.div
                layout
                className="h-[220px] rounded-xl border bg-foreground/5"
              />
              {/* Cards : 2 colonnes en desktop, 1 en mobile */}
              <motion.div
                layout
                className={[
                  "grid gap-3",
                  isMobile ? "grid-cols-1" : "grid-cols-2",
                ].join(" ")}
              >
                <motion.div
                  layout
                  className="h-28 rounded-xl border bg-foreground/5"
                />
                <motion.div
                  layout
                  className="h-28 rounded-xl border bg-foreground/5"
                />
                <motion.div
                  layout
                  className="h-28 rounded-xl border bg-foreground/5"
                />
                <motion.div
                  layout
                  className="h-28 rounded-xl border bg-foreground/5"
                />
              </motion.div>
            </motion.main>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
