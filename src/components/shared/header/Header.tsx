//src/components/shared/header/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/shared/ThemeToggle";

// Helpers minimalistes (sans utils externes)
const isScrollableY = (el: Element | null): el is HTMLElement => {
  if (!el || !(el instanceof HTMLElement)) return false;
  const cs = getComputedStyle(el);
  if (!/(auto|scroll)/.test(cs.overflowY)) return false;
  return el.scrollHeight > el.clientHeight + 1;
};
const hasScrollableAncestorInDirection = (
  start: EventTarget | null,
  deltaY: number,
): boolean => {
  const up = deltaY < 0;
  let el: HTMLElement | null =
    start instanceof HTMLElement
      ? start
      : start instanceof Element
        ? (start as HTMLElement)
        : null;

  while (el && el !== document.body && el !== document.documentElement) {
    if (isScrollableY(el)) {
      const canUp = el.scrollTop > 0;
      const canDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
      if ((up && canUp) || (!up && canDown)) return true;
    }
    el = el.parentElement;
  }
  return false;
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/forfaits", label: "Forfaits" },
  { href: "/portfolio", label: "Portfolio" },
];

const OPT_SCROLL: AddEventListenerOptions = { passive: true };
const OPT_TOUCH: AddEventListenerOptions = { passive: true };
const OPT_WHEEL = { passive: true, capture: true } as const;
const OPT_KEY = { capture: true } as const;

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(true); // true => header visible

  // Spacer dynamique (utilise --header-h dans <main style={{ paddingTop: var(--header-h) }})
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${e.contentRect.height}px`,
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Accent visuel après quelques px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu à la navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Headroom minimal (apparition immédiate au moindre input vers le haut)
  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduce) return;

    let lastY = window.scrollY;
    let ticking = false;
    let lastTouchY = 0;
    const raf = (fn: () => void) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        fn();
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      raf(() => {
        if (dy < -6)
          setRevealed(true); // légère remontée → show
        else if (dy > 10 && y > 0) setRevealed(false); // descente franche → hide
        if (y <= 0) setRevealed(true);
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (hasScrollableAncestorInDirection(e.target, e.deltaY)) return;
      if (e.deltaY < 0) raf(() => setRevealed(true));
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? lastTouchY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? lastTouchY;
      const dy = y - lastTouchY;
      lastTouchY = y;
      if (dy > 2 && !hasScrollableAncestorInDirection(e.target, -dy)) {
        raf(() => setRevealed(true));
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const up = e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Home";
      if (!up) return;
      const active = document.activeElement as HTMLElement | null;
      if (hasScrollableAncestorInDirection(active, -1)) return;
      raf(() => setRevealed(true));
    };

    window.addEventListener("scroll", onScroll, OPT_SCROLL); 
    window.addEventListener("wheel", onWheel, OPT_WHEEL);
    window.addEventListener("touchstart", onTouchStart, OPT_TOUCH);
    window.addEventListener("touchmove", onTouchMove, OPT_TOUCH);
    window.addEventListener("keydown", onKey, OPT_KEY);

    return () => {
      window.removeEventListener("scroll", onScroll, OPT_SCROLL);
      window.removeEventListener("wheel", onWheel, OPT_WHEEL);
      window.removeEventListener("touchstart", onTouchStart, OPT_TOUCH);
      window.removeEventListener("touchmove", onTouchMove, OPT_TOUCH);
      window.removeEventListener("keydown", onKey, OPT_KEY);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      role="banner"
    >
      {/* Barre animée (porte le blur + la teinte blanche à 40%) */}
      <div
        className={[
          "relative transform-gpu will-change-transform",
          "relative isolate transform-gpu will-change-transform",
          "bg-[color:var(--header-tint)]",
          "supports-[backdrop-filter]:backdrop-blur-[28px] md:supports-[backdrop-filter]:backdrop-blur-[56px] lg:supports-[backdrop-filter]:backdrop-blur-[72px]",
          "supports-[backdrop-filter]:backdrop-saturate-150 md:supports-[backdrop-filter]:backdrop-saturate-175",
          // Animation d’apparition (pas d’anim d’opacité sur le blur pour éviter tout lag visuel)
          "transition-[transform,box-shadow] duration-[320ms] [transition-timing-function:cubic-bezier(.2,.8,.16,1)]",
          revealed ? "translate-y-0" : "-translate-y-full",
          scrolled ? "shadow-[0_6px_28px_rgba(0,0,0,0.08)]" : "shadow-none",
          // fine ligne de séparation via ::after (ne modifie pas la box-size)
          "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px",
          scrolled ? "after:bg-border/70" : "after:bg-transparent",
        ].join(" ")}
        style={{
          // Renfort “bulletproof” (au cas où Tailwind purgerait un utilitaire)
          WebkitBackdropFilter: "blur(56px) saturate(1.75)",
          backdropFilter: "blur(56px) saturate(1.75)",
        }}
      >
        {/* Halo de diffusion (optionnel mais conseillé pour un rendu SaaS) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 z-0 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(120% 140% at 50% -20%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)",
          }}
        />

        {/* Contenu */}
        <div className="relative z-10 mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:h-16 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-foreground text-background text-[10px]">
              S
            </span>
            <span>Sparqup</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle scale={0.6} />
            <Link
              href="/contact"
              className="rounded bg-foreground px-3 py-1.5 text-sm text-background transition-opacity hover:opacity-90"
            >
              Parler de votre projet
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="inline-flex items-center justify-center rounded md:hidden text-foreground"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden
              className="fill-current"
            >
              {open ? (
                <path d="M18.3 5.7a1 1 0 0 1 0 1.4L13.4 12l-4.9 4.9a1 1 0 1 1-1.4 1.4L12 13.4l4.9 4.9a1 1 0 1 1 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 1 0-1.4Z" />
              ) : (
                <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
              )}
            </svg>
          </button>
        </div>

        {/* Drawer mobile */}
        <div
          className={[
            "md:hidden relative",
            "transition-[max-height,opacity,transform] duration-300 [transition-timing-function:cubic-bezier(.2,.8,.16,1)]",
            open
              ? "max-h-[70vh] opacity-100 translate-y-0 pointer-events-auto"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
            "bg-background/70 border-b border-border/50 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]",
          ].join(" ")}
          aria-hidden={!open}
        >
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-2">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded px-2 py-2 text-sm transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground/80 hover:bg-foreground/10",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between">
              <ThemeToggle scale={0.6} />
              <Link
                href="/contact"
                className="rounded bg-foreground px-3 py-2 text-center text-sm text-background"
              >
                Parler de votre projet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
