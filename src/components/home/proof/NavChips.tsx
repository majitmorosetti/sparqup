"use client"

type Props = {
  labels: string[]
  active: number
  onSelect: (i: number) => void
  /** classes pour le conteneur (ex: gap, marges externes gérées ailleurs) */
  className?: string
  /** classes pour chaque “pill” (taille, padding, font-size, etc.) */
  pillClass?: string
}

export default function NavChips({
  labels,
  active,
  onSelect,
  className = "",
  pillClass = "px-2.5 py-1 text-xs",
}: Props) {
  return (
    <div className={["flex flex-wrap items-center gap-2", className].join(" ")}>
      {labels.map((l, i) => {
        const isActive = i === active
        return (
          <button
            key={l + i}
            onClick={() => onSelect(i)}
            className={[
              "inline-flex items-center rounded-full transition",
              pillClass,
              isActive
                ? "bg-foreground text-background"
                : "bg-foreground/10 text-foreground hover:bg-foreground/15",
            ].join(" ")}
            aria-label={`Voir ${l}`}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}
