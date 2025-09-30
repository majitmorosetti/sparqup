// src/components/home/HeroMockTilt.tsx
"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

type Props = {
  src: string
  alt?: string
  width: number
  height: number
  className?: string

  perspective?: number
  tiltMaxX?: number
  tiltMaxY?: number
  inertia?: number

  mobileScrollTilt?: boolean
  floatAmpDeg?: number
  floatHz?: number

  magnet?: boolean
  magnetScale?: number
  magnetZone?: number
  magnetPower?: number

  glare?: boolean
  glareStrength?: number

  /** Idle wobble (desktop, hors hover) */
  idleWobbleDeg?: number        // amplitude max en ° (def 0.8)
  idleWobbleEverySec?: number   // intervalle moyen (def 2.8)

  roundedClass?: string
  priority?: boolean
}

export default function HeroMockTilt({
  src,
  alt = "",
  width,
  height,
  className = "",
  perspective = 900,
  tiltMaxX = 18,
  tiltMaxY = 22,
  inertia = 0.12,
  mobileScrollTilt = true,
  floatAmpDeg = 1.2,
  floatHz = 0.09,
  magnet = true,
  magnetScale = 1.03,
  magnetZone = 0.18,
  magnetPower = 1.35,
  glare = true,
  glareStrength = 0.28,
  idleWobbleDeg = 0.8,
  idleWobbleEverySec = 2.8,
  roundedClass = "rounded-2xl",
  priority = false,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  // cible issue du pointer (desktop) ou du scroll (mobile)
  const [targetX, setTargetX] = useState(0)
  const [targetY, setTargetY] = useState(0)

  // états courants (inertie)
  const [currX, setCurrX] = useState(0)
  const [currY, setCurrY] = useState(0)
  const [scaleCurr, setScaleCurr] = useState(1)

  const [reduced, setReduced] = useState(false)
  const [coarse, setCoarse] = useState(false)
  const [hover, setHover] = useState(false)

  // wobble (idle) interne
  const wobbleRef = useRef({
    currX: 0,
    currY: 0,
    targetX: 0,
    targetY: 0,
    nextAt: 0,
  })

  // media queries
  useEffect(() => {
    const m1 = window.matchMedia("(prefers-reduced-motion: reduce)")
    const m2 = window.matchMedia("(pointer: coarse)")
    const update = () => { setReduced(m1.matches); setCoarse(m2.matches) }
    update()
    m1.addEventListener?.("change", update)
    m2.addEventListener?.("change", update)
    return () => {
      m1.removeEventListener?.("change", update)
      m2.removeEventListener?.("change", update)
    }
  }, [])

  // Desktop : pointer -> tilt + magnet
  useEffect(() => {
    const el = wrapperRef.current
    if (!el || reduced || coarse) return

    const onEnter = () => setHover(true)
    const onLeave = () => { setHover(false); setTargetX(0); setTargetY(0) }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      let nx = clamp((e.clientX - cx) / (r.width / 2), -1, 1)
      let ny = clamp((e.clientY - cy) / (r.height / 2), -1, 1)

      if (magnet) {
        const d = Math.hypot(nx, ny)
        const dead = d < magnetZone ? d * 0.35 : d
        const k = Math.pow(dead, magnetPower) / Math.max(1e-6, d)
        nx *= k; ny *= k
      }

      setTargetX(clamp(-ny * tiltMaxX, -tiltMaxX, tiltMaxX))
      setTargetY(clamp(nx * tiltMaxY, -tiltMaxY, tiltMaxY))
    }

    el.addEventListener("pointerenter", onEnter)
    el.addEventListener("pointerleave", onLeave)
    el.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      el.removeEventListener("pointerenter", onEnter)
      el.removeEventListener("pointerleave", onLeave)
      el.removeEventListener("pointermove", onMove)
    }
  }, [reduced, coarse, tiltMaxX, tiltMaxY, magnet, magnetPower, magnetZone])

  // Mobile : scroll -> tilt
  useEffect(() => {
    const el = wrapperRef.current
    if (!el || reduced || !coarse || !mobileScrollTilt) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const mid = r.top + r.height / 2
      const vh = window.innerHeight
      const p = clamp((mid - vh / 2) / (vh / 2), -1, 1)
      const tx = Math.sin(p * Math.PI) * (tiltMaxX * 0.7)
      const ty = Math.cos(p * Math.PI) * (tiltMaxY * 0.6)
      setTargetX(tx); setTargetY(ty)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [reduced, coarse, mobileScrollTilt, tiltMaxX, tiltMaxY])

  // Idle wobble (desktop only, hors hover) — petites cibles aléatoires, easing doux
  useEffect(() => {
    if (reduced || coarse) { wobbleRef.current = { currX:0, currY:0, targetX:0, targetY:0, nextAt:0 }; return }
    let raf = 0
    const base = Math.max(0.8, idleWobbleEverySec) * 1000
    const pick = (now: number) => {
      wobbleRef.current.targetX = (Math.random() * 2 - 1) * idleWobbleDeg
      wobbleRef.current.targetY = (Math.random() * 2 - 1) * idleWobbleDeg
      // prochain changement entre base et ~2*base
      wobbleRef.current.nextAt = now + base + Math.random() * base
    }
    const tick = () => {
      const now = performance.now()
      const w = wobbleRef.current
      if (!hover && now >= w.nextAt) pick(now)
      // ease très léger
      const k = 0.02
      w.currX += (w.targetX - w.currX) * k
      w.currY += (w.targetY - w.currY) * k
      raf = requestAnimationFrame(tick)
    }
    pick(performance.now())
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, coarse, hover, idleWobbleDeg, idleWobbleEverySec])

  // Inertie + float doux
  useEffect(() => {
    if (reduced) { setCurrX(0); setCurrY(0); setScaleCurr(1); return }
    let raf = 0
    const t0 = performance.now()
    const step = () => {
      const t = (performance.now() - t0) / 1000
      const fx = floatAmpDeg * Math.sin(t * 2 * Math.PI * floatHz)
      const fy = floatAmpDeg * 0.7 * Math.cos(t * 2 * Math.PI * (floatHz * 1.13))

      const wobbleX = (!coarse && !hover) ? wobbleRef.current.currX : 0
      const wobbleY = (!coarse && !hover) ? wobbleRef.current.currY : 0

      setCurrX(v => v + ((targetX + fx + wobbleX) - v) * inertia)
      setCurrY(v => v + ((targetY + fy + wobbleY) - v) * inertia)

      const scaleTarget = hover && !coarse && magnet ? magnetScale : 1
      setScaleCurr(s => s + (scaleTarget - s) * (inertia * 0.85))

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [targetX, targetY, inertia, floatAmpDeg, floatHz, hover, coarse, magnet, magnetScale, reduced])

  // Glare
  useEffect(() => {
    if (!glare || !glareRef.current) return
    const gx = clamp(currY / tiltMaxY, -1, 1)
    const gy = clamp(-currX / tiltMaxX, -1, 1)
    const tx = gx * 22
    const ty = gy * 18
    const el = glareRef.current
    el.style.transform = `translate(${tx}%, ${ty}%)`
    el.style.opacity = String(glareStrength)
  }, [glare, glareStrength, currX, currY, tiltMaxX, tiltMaxY])

  const transform = useMemo(
    () => `rotateX(${currX.toFixed(3)}deg) rotateY(${currY.toFixed(3)}deg) scale(${scaleCurr.toFixed(4)})`,
    [currX, currY, scaleCurr]
  )

  return (
    <div
      ref={wrapperRef}
      className={["relative isolate overflow-visible w-full select-none", className].join(" ")}
      style={{ perspective: `${perspective}px` }}
      aria-label="Mockup 3D"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={["mx-auto will-change-transform", roundedClass, "shadow-[0_10px_30px_-10px_rgba(0,0,0,.45)]"].join(" ")}
        style={{
          transform,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transition: reduced ? "transform 0.2s ease-out" : "transform 0s",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={["block max-w-full h-auto", roundedClass].join(" ")}
        />

        {glare && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              ref={glareRef}
              aria-hidden
              className="absolute -inset-1"
              style={{
                background:
                  "radial-gradient(120% 70% at 20% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.10) 24%, transparent 60%)",
                mixBlendMode: "screen",
                filter: "saturate(1.1)",
                transition: "transform .2s ease-out, opacity .2s ease-out",
                opacity: 0,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
