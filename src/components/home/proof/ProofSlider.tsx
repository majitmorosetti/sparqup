"use client";

import { useLayoutEffect, useMemo, useRef, useState, useId } from "react";
import Slider, { SliderHandle } from "./Slider";
import MiniShot from "./MiniShot";
import MetricsGrid from "./MetricsGrid";
import NavChips from "./NavChips";
import type { BandLook, Slide } from "./types";
import { screenshotURL, brandColorsFrom, brandGradient } from "./utils";

type Props = {
  slides: Slide[];
  title?: string;
  look?: BandLook;
  className?: string;
  contentMaxWidth?: number;
  autoPlayMs?: number;
  showNav?: boolean;
  bgDarken?: number;
  bgSaturate?: number;
  /** Réserver une hauteur constante (max des slides) pour éviter tout saut */
  lockHeight?: boolean;
  /** Durée d’animation de la hauteur (ms) si elle change après re-mesure */
  heightTransitionMs?: number;
};

export default function ProofSlider({
  slides,
  title,
  look = "theme",
  className = "",
  contentMaxWidth = 560,
  autoPlayMs,
  showNav = true,
  bgDarken = 0.22,
  bgSaturate = 1.15,
  lockHeight = true,
  heightTransitionMs = 220,
}: Props) {
  const [index, setIndex] = useState(0);
  const ref = useRef<SliderHandle>(null);
  const active = slides[index];

  // --- Fond (blur screenshot + dégradé marque)
  const bgImage = useMemo(() => {
    if (!active || look === "none") return null;
    return active.site.url
      ? screenshotURL(active.site.url, active.screenshot)
      : null;
  }, [active, look]);

  const brandGrad = useMemo(() => {
    if (!active || look === "none") return "";
    const colors = brandColorsFrom(
      active.site.name,
      active.screenshot?.placeholder,
    );
    return brandGradient(colors, "soft");
  }, [active, look]);

  // --- Mesure des hauteurs (miroir caché)
  const measureRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<number | null>(null);

  const uid = useId();

  // Re-mesure (ResizeObserver sur le miroir) + window resize
  useLayoutEffect(() => {
    if (!lockHeight) return;
    const m = measureRef.current;
    if (!m) return;

    const compute = () => {
      // chaque enfant direct représente une slide "miroir"
      const items = Array.from(m.children) as HTMLElement[];
      const heights = items.map((el) => el.offsetHeight);
      const newMax = Math.max(...heights, 0);
      setMaxH((prev) => (prev === newMax ? prev : newMax));
    };

    // Observe tous les descendants (images qui chargent, etc.)
    const ro = new ResizeObserver(() => compute());
    ro.observe(m);
    // 1ère mesure
    compute();

    // Re-mesure sur resize viewport
    const onResize = () => compute();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [slides, lockHeight, contentMaxWidth]);

  // --- viewport height style
  const viewportStyle: React.CSSProperties = lockHeight
    ? {
        height: maxH ? `${maxH}px` : undefined, // le temps de mesurer : auto
        transition: maxH ? `height ${heightTransitionMs}ms ease` : undefined,
      }
    : {};

  return (
    <section
      className={[
        "relative isolate overflow-hidden [contain:paint] w-full py-4 md:py-5",
        className,
      ].join(" ")}
      aria-label="Showcases & performances"
    >
      {look !== "none" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {bgImage ? (
            <div
              className="absolute inset-0 will-change-transform [--bg-blur:32px] md:[--bg-blur:40px]"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(var(--bg-blur)) saturate(${bgSaturate})`,
                transform: "scale(1.04)",
                maskImage:
                  "radial-gradient(120% 200% at 50% 10%, black 52%, transparent 100%)",
              }}
            />
          ) : null}
          <div
            className="absolute inset-0 [--bg-blur:20px] md:[--bg-blur:24px]"
            style={{
              background: brandGrad,
              filter: bgImage ? undefined : `blur(var(--bg-blur))`,
              opacity: bgImage ? 0.36 : 1,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.45) 100%)",
              opacity: bgDarken,
            }}
          />
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {title ? (
          <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted">
            {title}
          </h2>
        ) : null}

        {/* VIEWPORT avec hauteur verrouillée */}
        <div className="relative w-full overflow-hidden" style={viewportStyle}>
          <Slider ref={ref} autoPlayMs={autoPlayMs} onIndexChange={setIndex}>
            {slides.map((s, i) => (
              <div
                key={s.site.name}
                id={`panel-${uid}-${i}`}
                role="tabpanel"
                aria-labelledby={`tab-${uid}-${i}`}
                aria-hidden={i !== index}
                className="mx-auto"
                style={{ maxWidth: contentMaxWidth }}
              >
                <div className="flex items-center gap-3 md:gap-4 py-2.5">
                  {/* TIP perf/anti-jump : fixe un ratio constant dans MiniShot */}
                  <MiniShot
                    siteName={s.site.name}
                    siteUrl={s.site.url}
                    screenshot={s.screenshot}
                  />
                  <MetricsGrid metrics={s.metrics} />
                  {s.extras?.length ? (
                    <div className="hidden md:flex shrink-0 items-center gap-2 pl-1">
                      {s.extras.map((x, i) =>
                        x.href ? (
                          <a
                            key={x.label + i}
                            href={x.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-foreground/80 hover:underline"
                          >
                            {x.label}
                          </a>
                        ) : (
                          <span
                            key={x.label + i}
                            className="text-sm text-foreground/70"
                          >
                            {x.label}
                          </span>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {showNav && slides.length > 1 ? (
          <div className="mt-3">
            <NavChips
              labels={slides.map((s) => s.site.name)}
              active={index}
              onSelect={(i) => {
                ref.current?.goTo(i);
              }}
              className="gap-2"
              pillClass="px-3 py-1.5 text-sm"
            />
          </div>
        ) : null}
      </div>

      {/* --- MIRROR caché pour mesurer les hauteurs réelles, à largeur égale --- */}
      {lockHeight && (
        <div
          ref={measureRef}
          aria-hidden
          className="invisible pointer-events-none absolute left-[-9999px] top-0 w-[min(100%,var(--content-w,560px))]"
          style={
            { "--content-w": `${contentMaxWidth}px` } as React.CSSProperties
          }
        >
          {slides.map((s) => (
            <div
              key={`measure-${s.site.name}`}
              className="mx-auto"
              style={{ maxWidth: contentMaxWidth }}
            >
              <div className="flex items-center gap-3 md:gap-4 py-2.5">
                {/* Même structure pour avoir la vraie hauteur */}
                <MiniShot
                  siteName={s.site.name}
                  siteUrl={s.site.url}
                  screenshot={s.screenshot}
                />
                <MetricsGrid metrics={s.metrics} />
                {s.extras?.length ? (
                  <div className="hidden md:flex shrink-0 items-center gap-2 pl-1">
                    {s.extras.map((x, i) =>
                      x.href ? (
                        <span key={x.label + i} className="text-sm">
                          {x.label}
                        </span>
                      ) : (
                        <span key={x.label + i} className="text-sm">
                          {x.label}
                        </span>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
