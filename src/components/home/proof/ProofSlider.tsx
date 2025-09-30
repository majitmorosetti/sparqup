"use client"

import { useMemo, useRef, useState } from "react"
import Slider, { SliderHandle } from "./Slider"
import MiniShot from "./MiniShot"
import MetricsGrid from "./MetricsGrid"
import NavChips from "./NavChips"
import type { BandLook, Slide } from "./types"
import { screenshotURL, brandColorsFrom, brandGradient } from "./utils"

export default function ProofSlider({
  slides,
  title,
  look = "theme",
  className = "",
  contentMaxWidth = 560,
  autoPlayMs,
  showNav = true,
  bgBlurPx = 40,
  bgDarken = 0.22,
  bgSaturate = 1.15,
}: {
  slides: Slide[]
  title?: string
  look?: BandLook
  className?: string
  contentMaxWidth?: number
  autoPlayMs?: number
  showNav?: boolean
  bgBlurPx?: number
  bgDarken?: number
  bgSaturate?: number
}) {
  const [index, setIndex] = useState(0)
  const ref = useRef<SliderHandle>(null)
  const active = slides[index]

  const bgImage = useMemo(() => {
    if (!active || look === "none") return null
    return active.site.url ? screenshotURL(active.site.url, active.screenshot) : null
  }, [active, look])

  const brandGrad = useMemo(() => {
    if (!active || look === "none") return ""
    const colors = brandColorsFrom(active.site.name, active.screenshot?.placeholder)
    return brandGradient(colors, "soft")
  }, [active, look])

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
              className="absolute inset-0 will-change-transform"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(${bgBlurPx}px) saturate(${bgSaturate})`,
                transform: "scale(1.04)",
                maskImage:
                  "radial-gradient(120% 200% at 50% 10%, black 52%, transparent 100%)",
              }}
            />
          ) : null}
          <div
            className="absolute inset-0"
            style={{
              background: brandGrad,
              filter: bgImage ? undefined : `blur(${Math.round(bgBlurPx * 0.6)}px)`,
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

        <Slider ref={ref} autoPlayMs={autoPlayMs} onIndexChange={setIndex}>
          {slides.map((s) => (
            <div key={s.site.name} className="mx-auto" style={{ maxWidth: contentMaxWidth }}>
              <div className="flex items-center gap-3 md:gap-4 py-2.5">
                <MiniShot siteName={s.site.name} siteUrl={s.site.url} screenshot={s.screenshot} />
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
                        <span key={x.label + i} className="text-sm text-foreground/70">
                          {x.label}
                        </span>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </Slider>

        {showNav && slides.length > 1 ? (
          <div className="mt-3">
            <NavChips
              labels={slides.map((s) => s.site.name)}
              active={index}
              onSelect={(i) => { ref.current?.goTo(i) }}   // <= bloc => type 'void'
              className="gap-2"
              pillClass="px-3 py-1.5 text-sm"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
