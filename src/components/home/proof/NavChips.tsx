"use client";
import { useId } from "react";

type Props = {
  labels: string[];
  active: number;
  onSelect: (i: number) => void;
  /** classes pour le conteneur (ex: gap, marges externes gérées ailleurs) */
  className?: string;
  /** classes pour chaque “pill” (taille, padding, font-size, etc.) */
  pillClass?: string;
};

export default function NavChips({
  labels,
  active,
  onSelect,
  className = "",
  pillClass = "px-2.5 py-1 text-xs",
}: Props) {
  const uid = useId();
  return (
    <div
      role="tablist"
      aria-label="Showcases"
      className={["flex flex-wrap items-center gap-2", className].join(" ")}
    >
      {labels.map((l, i) => {
        const isActive = i === active;
        return (
          <button
            key={l + i}
            id={`tab-${uid}-${i}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${uid}-${i}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            className={[
              "inline-flex items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
              pillClass,
              isActive
                ? "bg-foreground text-background"
                : "bg-foreground/10 text-foreground hover:bg-foreground/15",
            ].join(" ")}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
