"use client"

import { useMemo, useState } from "react"
import { ScreenshotConfig } from "./types"
import { screenshotURL } from "./utils"

export default function MiniShot({
  siteName,
  siteUrl,
  screenshot,
  minW = 128,    // 👈 plus grand en base
  idealVW = 44,  // % de viewport pour mobile
  maxW = 188,    // 👈 cap raisonnable
  ratio = "16/10",
}: {
  siteName: string
  siteUrl?: string
  screenshot?: ScreenshotConfig
  minW?: number
  idealVW?: number
  maxW?: number
  ratio?: `${number}/${number}` | "16/10" | "16/9" | "4/3"
}) {
  const [loaded, setLoaded] = useState(false)
  const [err, setErr] = useState(false)
  const src = useMemo(() => (siteUrl ? screenshotURL(siteUrl, screenshot) : null), [siteUrl, screenshot])

  // conteneur fluide : largeur = clamp(min, vw, max), hauteur via aspect-ratio
  const style: React.CSSProperties = {
    inlineSize: `clamp(${minW}px, ${idealVW}vw, ${maxW}px)`,
    aspectRatio: ratio,
  }

  if (src && !err) {
    return (
      <div className="shrink-0 overflow-hidden rounded-md">
        <div className="relative" style={style}>
          {!loaded && <div className="absolute inset-0 animate-pulse bg-foreground/10" />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Aperçu ${siteName}`}
            className="h-full w-full object-cover"
            decoding="async"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErr(true)}
          />
        </div>
      </div>
    )
  }

  const ph = screenshot?.placeholder
  const colors = ph?.colors?.length! >= 2 ? ph!.colors! : ["#0ea5e9", "#8b5cf6"]
  const bg = (ph?.kind ?? "gradient") === "solid"
    ? colors[0]
    : `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`

  return (
    <div className="shrink-0 overflow-hidden rounded-md">
      <div className="relative grid place-items-center text-background" style={{ ...style, background: bg }}>
        {(ph?.label || ph?.emoji) && (
          <div className="px-2 text-[11px] md:text-[12px] leading-4 font-medium text-center drop-shadow">
            {ph?.emoji ? <span className="mr-1">{ph.emoji}</span> : null}
            <span>{ph?.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
