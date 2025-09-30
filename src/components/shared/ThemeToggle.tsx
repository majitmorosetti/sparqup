"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Moon, Sun } from "lucide-react"

type Props = {
  /** Échelle globale (1 = taille d’origine). 0.6 = -40% */
  scale?: number
}

export default function ThemeToggle({ scale = 1 }: Props) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const reduce = useReducedMotion?.() ?? false

  /* Dimensions basées sur la taille d’origine, mises à l’échelle */
  const dims = useMemo(() => {
    const r = (v: number) => Math.max(1, Math.round(v * scale)) // arrondi propre, min 1px
    const TRACK_W = r(56)      // w-14
    const TRACK_H = r(32)      // h-8
    const PAD      = r(2)      // p-0.5
    const KNOB     = r(24)     // h-6 w-6
    const RANGE    = Math.max(8, TRACK_W - PAD * 2 - KNOB) // mouvement utile
    const ICON     = r(14)     // h-3.5 w-3.5
    const ICON_OFF = r(6)      // left/right 1.5
    return { TRACK_W, TRACK_H, PAD, KNOB, RANGE, ICON, ICON_OFF }
  }, [scale])

  useEffect(() => {
    setMounted(true)
    const el = document.documentElement
    const stored = localStorage.getItem("theme")
    const next = stored ? stored === "dark" : el.classList.contains("dark")
    el.classList.toggle("dark", next)
    setIsDark(next)
  }, [])

  const commitTheme = (next: boolean) => {
    const el = document.documentElement
    el.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setIsDark(next)
  }

  const toggle = () => commitTheme(!isDark)

  if (!mounted) return null

  const startX = isDark ? dims.RANGE : 0
  const threshold = dims.RANGE / 2

  return (
    <button
      type="button"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle() }
        if (e.key === "ArrowLeft")  commitTheme(false)
        if (e.key === "ArrowRight") commitTheme(true)
      }}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Passer en clair" : "Passer en sombre"}
      className={[
        "group relative inline-flex items-center rounded-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2",
        isDark
          ? "bg-gradient-to-r from-indigo-600 to-blue-600"
          : "bg-neutral-200 dark:bg-neutral-700",
      ].join(" ")}
      style={{
        width: dims.TRACK_W,
        height: dims.TRACK_H,
        padding: dims.PAD,
      }}
    >
      {/* icônes dans le track */}
      <span
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 transition-opacity"
        style={{ left: dims.ICON_OFF, opacity: isDark ? 0 : 1 }}
      >
        <Sun style={{ width: dims.ICON, height: dims.ICON }} className="text-amber-500" />
      </span>
      <span
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 transition-opacity"
        style={{ right: dims.ICON_OFF, opacity: isDark ? 1 : 0 }}
      >
        <Moon style={{ width: dims.ICON, height: dims.ICON }} className="text-sky-100" />
      </span>

      {/* knob */}
      <motion.span
        className="relative inline-flex items-center justify-center rounded-full bg-white shadow ring-1 ring-black/10 dark:bg-neutral-100"
        drag="x"
        dragElastic={0.12}
        dragMomentum={false}
        dragConstraints={{ left: 0, right: dims.RANGE }}
        onDragEnd={(_, info) => {
          const finalX = startX + info.offset.x
          commitTheme(finalX > threshold)
        }}
        animate={{ x: startX }}
        whileTap={reduce ? {} : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 34, mass: 0.6 }}
        style={{ width: dims.KNOB, height: dims.KNOB }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-black/0 to-black/5" />
      </motion.span>
    </button>
  )
}
