"use client"

import { Metric } from "./types"
export default function MetricsGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <ul
      className={[
        "grid min-w-0 flex-1",
        "gap-x-4 gap-y-1.5 md:gap-x-6 md:gap-y-2.5",
        "[grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]",
        "md:[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]",
      ].join(" ")}
      aria-label="Métriques"
    >
      {metrics.map((m, i) => (
        <li key={m.label + i} className="flex items-baseline gap-2 text-foreground">
          {m.icon ? <span className="opacity-75">{m.icon}</span> : null}
          <span className="text-[12px] leading-5 opacity-70">{m.label}</span>
          <span
            className={[
              "ml-auto font-semibold tabular-nums",
              "text-[15px] leading-5 md:text-[16px] md:leading-6",
              m.pending ? "opacity-70 italic" : "",
            ].join(" ")}
          >
            {m.value}
            {m.pending ? (
              <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current align-middle" />
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  )
}
