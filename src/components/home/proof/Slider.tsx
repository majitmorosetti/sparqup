// src/components/home/proof/Slider.tsx
"use client"

import { useEffect, useRef, useState, ReactNode, forwardRef, useImperativeHandle } from "react"

type Props = {
  children: ReactNode[]        // 1 slide = 100% de largeur
  className?: string
  autoPlayMs?: number          // optionnel
  onIndexChange?: (i: number) => void
}

export type SliderHandle = { goTo: (i: number) => void }

export default forwardRef<SliderHandle, Props>(function Slider(
  { children, className = "", autoPlayMs, onIndexChange },
  ref
) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useImperativeHandle(ref, () => ({
    goTo: (i: number) => {
      const el = scrollerRef.current
      const child = el?.children[i] as HTMLElement | undefined
      child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    },
  }))

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0, bestDist = Infinity
      const items = Array.from(el.children) as HTMLElement[]
      items.forEach((child, i) => {
        const c = child.offsetLeft + child.offsetWidth / 2
        const d = Math.abs(center - c)
        if (d < bestDist) { bestDist = d; best = i }
      })
      setIndex(best)
      onIndexChange?.(best)
    }
    onScroll()
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [onIndexChange])

  useEffect(() => {
    if (!autoPlayMs) return
    const el = scrollerRef.current
    if (!el) return
    const id = setInterval(() => {
      const next = (index + 1) % (children?.length ?? 1)
      const child = el.children[next] as HTMLElement | undefined
      child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }, autoPlayMs)
    return () => clearInterval(id)
  }, [autoPlayMs, index, children])

  return (
    <div
      ref={scrollerRef}
      className={[
        "flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-0",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      ].join(" ")}
      style={{ scrollSnapType: "x mandatory" }}
    >
      {Array.isArray(children) ? children.map((node, i) => (
        <article key={i} className="snap-center shrink-0 w-full">
          {node}
        </article>
      )) : children}
    </div>
  )
})
