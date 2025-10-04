"use client";

import { useMemo } from "react";
import ProofSlider from "./ProofSlider";
import type { Slide } from "./types";

// DATA (pure, sans React)
import { showcases } from "@/lib/showcases";
import type { ShowcaseData, IconKey } from "@/types/proof-data";

const iconMap: Record<
  IconKey,
  "gauge" | "timer" | "activity" | "external-link"
> = {
  gauge: "gauge",
  timer: "timer",
  activity: "activity",
};

function toSlides(data: ShowcaseData[]): Slide[] {
  return data.map((d) => ({
    site: { name: d.name, url: d.url },
    screenshot: d.screenshot, // shape compatible avec MiniShot
    metrics: d.metrics.map((m) => ({
      label: m.label,
      value: m.value,
      pending: m.pending,
      icon: m.icon ? iconMap[m.icon] : undefined,
    })),
    extras: d.extras,
  }));
}

export default function ProofSliderComposer({
  title = "Showcases & performances",
  look = "theme", // "none" | "theme" | "screenshot" (on applique de toute façon un fond brand-aware)
  contentMaxWidth = 560, // largeur interne compacte
  autoPlayMs = 7000, // avance douce (désactive en mettant undefined)
  showNav = true, // chips de navigation
}: {
  title?: string;
  look?: "none" | "theme" | "screenshot";
  contentMaxWidth?: number;
  autoPlayMs?: number;
  showNav?: boolean;
}) {
  const slides: Slide[] = useMemo(() => toSlides(showcases), []);
  return (
    <ProofSlider
      title={title}
      look={look}
      contentMaxWidth={contentMaxWidth}
      autoPlayMs={autoPlayMs}
      slides={slides}
      showNav={showNav}
    />
  );
}
