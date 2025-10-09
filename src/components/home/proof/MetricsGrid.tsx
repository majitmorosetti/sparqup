"use client";
import { Metric } from "./types";
import { Gauge, Timer, Activity, ExternalLink } from "lucide-react";

const Icon = ({ name }: { name?: Metric["icon"] }) => {
  switch (name) {
    case "gauge":
      return <Gauge className="h-3.5 w-3.5" />;
    case "timer":
      return <Timer className="h-3.5 w-3.5" />;
    case "activity":
      return <Activity className="h-3.5 w-3.5" />;
    case "external-link":
      return <ExternalLink className="h-3.5 w-3.5" />;
    default:
      return null;
  }
};

export default function MetricsGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <ul className="grid min-w-0 flex-1 gap-x-4 gap-y-1.5 md:gap-x-6 md:gap-y-2.5 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] md:[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
      {metrics.map((m, i) => (
        <li key={`${m.label}:${m.value ?? ""}:${i}`} className="flex items-baseline gap-2">
          {/* Icône avec halo "label-like" (drop-shadow pour SVG) */}
          {m.icon ? (
            <span
              aria-hidden
              className="
                inline-flex items-center
                [filter:drop-shadow(0_0_6px_var(--halo))_drop-shadow(0_0_12px_var(--halo))]
                md:[filter:drop-shadow(0_0_8px_var(--halo))_drop-shadow(0_0_14px_var(--halo))]
              "
            >
              <Icon name={m.icon} />
            </span>
          ) : null}

          {/* Label (inchangé) */}
          <span
            className="
              text-[12px] leading-5 opacity-85
              [text-shadow:0_0_6px_var(--halo),0_0_12px_var(--halo)]
              md:[text-shadow:0_0_8px_var(--halo),0_0_14px_var(--halo)]
            "
          >
            {m.label}
          </span>

          {/* Valeur — même halo que label */}
          <span
            className="
              ml-auto font-semibold tabular-nums
              text-[15px] leading-5 md:text-[16px] md:leading-6
              [text-shadow:0_0_6px_var(--halo),0_0_12px_var(--halo)]
              md:[text-shadow:0_0_8px_var(--halo),0_0_14px_var(--halo)]
            "
          >
            {m.value}
            {m.pending ? (
              <span className="ml-1 inline-block h-1.5 w-1.5 align-middle rounded-full animate-pulse bg-current" />
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
