"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ThemeToggle from "@/components/shared/ThemeToggle"

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/forfaits", label: "Forfaits" },
  { href: "/portfolio", label: "Portfolio" },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  // fermez le menu quand la route change
  useEffect(() => { setOpen(false) }, [pathname])

  // état "scrolled" (fond plus lisible)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // headroom (hide on scroll down, show on scroll up)
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const THRESH = 8
    const PIN_AT = 80

    const onScroll = () => {
      const y = window.scrollY
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (open || y <= 0) {
          setHidden(false)
        } else if (Math.abs(y - lastY) > THRESH) {
          setHidden(y > lastY && y > PIN_AT)
        }
        lastY = y
        ticking = false
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [open])

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      data-hidden={hidden ? "true" : "false"}
      className={[
        // reste dans le flux -> pas de CLS
        "sticky top-0 z-50 will-change-transform transition-transform duration-300",
        "translate-z-0", // GPU hint
        // hide/show sans reflow
        "data-[hidden=true]:-translate-y-full",
        // fond frosted (superposé visuellement) + ligne via ::after pour ne pas changer la box-size
        "backdrop-blur-xl backdrop-saturate-150",
        "bg-background/60 supports-[backdrop-filter]:bg-background/30",
        "data-[scrolled=true]:backdrop-blur-2xl data-[scrolled=true]:backdrop-saturate-200",
        "supports-[backdrop-filter]:data-[scrolled=true]:bg-background/45",
        "relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px",
        "data-[scrolled=true]:after:bg-border/70 after:bg-transparent",
      ].join(" ")}
      style={{ transform: "translateZ(0)" }}
    >
      {/* barre principale (hauteur constante -> pas de shift) */}
      <div className="relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:h-16 md:px-6">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-foreground text-background text-[10px]">
            S
          </span>
          <span>Sparqup</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-sm transition-colors",
                  active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </Link>
            )
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

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded md:hidden text-foreground"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="fill-current">
            {open ? (
              <path d="M18.3 5.7a1 1 0 0 1 0 1.4L13.4 12l4.9 4.9a1 1 0 1 1-1.4 1.4L12 13.4l-4.9 4.9a1 1 0 1 1-1.4-1.4L10.6 12 5.7 7.1A1 1 0 0 1 7.1 5.7L12 10.6l4.9-4.9a1 1 0 0 1 1.4 0Z" />
            ) : (
              <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
            )}
          </svg>
        </button>

        {/* Drawer mobile en OVERLAY (ne pousse pas le contenu) */}
        <div
          className={[
            "absolute left-0 right-0 top-full md:hidden",
            "transition-[max-height,opacity,transform] duration-300 ease-out",
            open ? "max-h-[70vh] opacity-100 translate-y-0 pointer-events-auto"
                 : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
            // frosted overlay + légère ombre en dessous
            "backdrop-blur-xl backdrop-saturate-150",
            "bg-background/70 supports-[backdrop-filter]:bg-background/35",
            "border-b border-border/50 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]",
          ].join(" ")}
          aria-hidden={!open}
        >
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-2">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded px-2 py-2 text-sm transition-colors",
                    active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-foreground/10",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              )
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
  )
}
