// src/components/home/proof/utils.ts
import type { ScreenshotConfig } from "./types"

// (existant)
export function screenshotURL(siteUrl?: string, cfg?: ScreenshotConfig) {
  if (!siteUrl) return null
  if (cfg?.url) return cfg.url
  const encoded = encodeURIComponent(siteUrl)
  const w = Math.max(200, Math.min(1200, cfg?.width ?? 640))
  return cfg?.provider === "thumio"
    ? `https://image.thum.io/get/width/${w}/${siteUrl}`
    : `https://s.wordpress.com/mshots/v1/${encoded}?w=${w}`
}

// --- NEW: utilitaires "brand" ---

// hash simple → hue stable (0–359) à partir d'un nom de projet
export function hashHue(input: string) {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0
  return h % 360
}

// construit des couleurs "marque" à partir du placeholder, sinon du nom
export function brandColorsFrom(
  projectName: string,
  placeholder?: ScreenshotConfig["placeholder"]
): [string, string] {
  if (placeholder?.colors?.length && placeholder.colors.length >= 2) {
    return [placeholder.colors[0], placeholder.colors[1]]
  }
  const base = hashHue(projectName)
  const alt = (base + 40) % 360
  // teintes OK pour light/dark (oklab/hsl : on reste simple en HSL)
  return [`hsl(${base} 72% 54%)`, `hsl(${alt} 70% 50%)`]
}

// dégradé "marque" moderne (radial(s)) — doux par défaut
export function brandGradient([c1, c2]: [string, string], strength: "soft" | "bold" = "soft") {
  const a1 = strength === "soft" ? 0.85 : 1
  const a2 = strength === "soft" ? 0.75 : 0.92
  return `
    radial-gradient(900px 180px at 50% 0%, ${withAlpha(c1, a1)} 0%, transparent 70%),
    radial-gradient(900px 320px at 100% 20%, ${withAlpha(c2, a2)} 0%, transparent 72%)
  `
}

function withAlpha(color: string, alpha: number) {
  // si l’utilisateur a donné un hex/nom, on applique l’opacité via color-mix
  // (fallback modern CSS; pas parfait pour tous les formats mais suffisant ici)
  return `color-mix(in oklab, ${color}, transparent ${Math.round((1 - alpha) * 100)}%)`
}
